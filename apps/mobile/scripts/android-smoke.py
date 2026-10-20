"""Destructive emulator-only smoke test: clears ca.avolab.hub's local data.
Run: ADB=/path/to/adb python3 scripts/android-smoke.py /absolute/evidence/dir
Install the self-contained preview APK first. Does not access store accounts.
"""
import json, os, re, subprocess, sys, time
from pathlib import Path
import xml.etree.ElementTree as ET
ADB = os.environ.get('ADB', 'adb')
OUT = Path(sys.argv[1]); OUT.mkdir(parents=True, exist_ok=True)
PACKAGE = 'ca.avolab.hub'
results = []
def adb(*args):
    return subprocess.check_output([ADB, *args], stderr=subprocess.STDOUT).decode('utf-8', errors='replace')
def ui():
    adb('shell','uiautomator','dump','/sdcard/avolab-smoke.xml')
    return ET.fromstring(adb('shell','cat','/sdcard/avolab-smoke.xml'))
def labels():
    return ' '.join(n.get('text','')+' '+n.get('content-desc','') for n in ui().iter('node'))
def check(name, expected):
    assert expected in labels(), f'{name}: missing {expected}'
    results.append(name); print('PASS',name,flush=True)
def find(label):
    for n in ui().iter('node'):
        if label.casefold() in (n.get('text','').casefold(), n.get('content-desc','').casefold()):
            coords=list(map(int,re.findall(r'\d+',n.get('bounds',''))))
            if len(coords)==4 and coords[3]>coords[1]:return ((coords[0]+coords[2])//2,(coords[1]+coords[3])//2)
    raise AssertionError(f'Visible target missing: {label}')
def tap(label):
    x,y=find(label);adb('shell','input','tap',str(x),str(y));time.sleep(.35)
def swipe():
    adb('shell','input','swipe','540','1900','540','650','400');time.sleep(.3)
def shot(name):
    (OUT/f'{name}.png').write_bytes(subprocess.check_output([ADB,'exec-out','screencap','-p']))
def launch():
    adb('shell','am','start','-n',PACKAGE+'/.MainActivity');time.sleep(2)
def restart():
    adb('shell','am','force-stop',PACKAGE);launch()
assert 'emulator-' in adb('get-serialno'), 'Run only on an emulator; this clears test-app data.'
original_airplane=adb('shell','settings','get','global','airplane_mode_on').strip()
try:
    adb('shell','pm','clear',PACKAGE);adb('logcat','-c');launch()
    check('fresh native launch','Good things.');shot('discover')
    tap('Explore DashVerse');check('product detail','Opens in your browser')
    tap('Save to your library');check('save product','Remove from saved');shot('details')
    tap('Share DashVerse');check('native share sheet','DashVerse');adb('shell','input','keyevent','4')
    tap('Open DashVerse');time.sleep(2)
    resumed=adb('shell','dumpsys','activity','activities')
    assert any(('ResumedActivity' in line or 'Resumed:' in line) and 'com.android.chrome/' in line for line in resumed.splitlines()), 'Browser handoff missing'
    results.append('external browser handoff');print('PASS external browser handoff',flush=True)
    launch();adb('shell','input','keyevent','4');time.sleep(.5);tap('Library')
    check('saved library','Saved apps · 1');check('recent open history','Recently opened');shot('library')
    restart();tap('Library');check('favourites persist across process restart','Saved apps · 1')
    tap('Discover');tap('Search apps');adb('shell','input','text','soundspace');adb('shell','input','keyevent','4');swipe()
    check('search real catalogue','1 app to explore');check('search result','Soundspace')
    tap('Tools');check('combined category empty state','No matches yet');shot('empty-search')
    tap('Audio');check('audio category search','Soundspace');tap('Clear search');tap('All')
    tap('Play');check('native offline game','Find your fast.');shot('play')
    x,y=find('Start Pulse round');adb('shell','input','tap',str(x),str(y));adb('shell','input','tap',str(x),str(y));check('early-tap rejection','A little too soon.')
    tap('Start Pulse round');time.sleep(4);tap('Tap now');check('reaction result and personal best','Personal best');shot('pulse-result')
    restart();tap('Play');check('personal best persists','Personal best')
    tap('Start Pulse round');adb('shell','input','keyevent','3');time.sleep(.5);launch();check('background cancels active round','Find your fast.')
    adb('shell','cmd','connectivity','airplane-mode','enable');restart();check('offline catalogue','Good things.');tap('Library');check('offline library','Saved apps · 1');tap('Play');check('offline native game','Find your fast.')
    tap('About');swipe();swipe();tap('Clear device data');tap('Cancel');tap('Library');check('reset cancellation preserves data','Saved apps · 1')
    tap('About');swipe();swipe();tap('Clear device data');tap('Clear data');tap('Library');check('confirmed data reset','Saved apps · 0');tap('Play');check('reset clears personal best','Your first best is waiting.')
    log=adb('logcat','-d','-s','AndroidRuntime:E','ReactNativeJS:E');(OUT/'runtime-errors.log').write_text(log)
    assert 'FATAL EXCEPTION' not in log and 'TypeError' not in log and 'ReferenceError' not in log,log
    results.append('no native or JS fatal runtime errors')
    tap('Discover');shot('final-discover')
finally:
    adb('shell','cmd','connectivity','airplane-mode','enable' if original_airplane=='1' else 'disable')
    (OUT/'results.json').write_text(json.dumps({'passed':results,'count':len(results)},indent=2)+'\n')
print(f'PASS {len(results)} Android runtime checks',flush=True)
