import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  AppState,
  BackHandler,
  FlatList,
  Image,
  Linking,
  Modal,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import catalog from "./src/catalog.json";
import { images } from "./src/images";
import {
  EMPTY,
  filterProducts,
  recordOpen,
  recordScore,
  restore,
  toggleSaved,
  type HubState,
  type Product,
} from "./src/model";

const products: Product[] = catalog;
const KEY = "avolab.hub.v1";
const C = {
  bg: "#0a0a0f",
  card: "#1c1c2e",
  text: "#ffffff",
  muted: "#ababbe",
  accent: "#ad94ff",
  line: "#303044",
};
type Tab = "Discover" | "Library" | "Play" | "About";
const tabs: {
  name: Tab;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}[] = [
  { name: "Discover", icon: "planet-outline" },
  { name: "Library", icon: "bookmark-outline" },
  { name: "Play", icon: "game-controller-outline" },
  { name: "About", icon: "information-circle-outline" },
];
function Icon({
  name,
  color = C.text,
  size = 22,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color?: string;
  size?: number;
}) {
  return <Ionicons name={name} color={color} size={size} />;
}
function Button({
  label,
  onPress,
  secondary = false,
}: {
  label: string;
  onPress: () => void;
  secondary?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        s.button,
        secondary && s.secondary,
        pressed && s.pressed,
      ]}
    >
      <Text style={[s.buttonText, secondary && { color: C.text }]}>
        {label}
      </Text>
    </Pressable>
  );
}
function Artwork({
  product,
  large = false,
}: {
  product: Product;
  large?: boolean;
}) {
  return images[product.slug] ? (
    <Image
      accessible={false}
      source={images[product.slug]}
      style={[s.art, large && s.artLarge]}
      resizeMode="cover"
    />
  ) : (
    <LinearGradient
      colors={[
        product.poster?.from || "#6648a2",
        product.poster?.to || "#242139",
      ]}
      style={[s.art, s.poster, large && s.artLarge]}
    >
      <Text style={{ fontSize: large ? 64 : 38 }}>
        {product.poster?.glyph || "✦"}
      </Text>
    </LinearGradient>
  );
}
export default function App() {
  return (
    <SafeAreaProvider>
      <Hub />
    </SafeAreaProvider>
  );
}
function Hub() {
  const [tab, setTab] = useState<Tab>("Discover");
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("All");
  const [state, setState] = useState<HubState>(EMPTY);
  const [ready, setReady] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const writeQueue = useRef(Promise.resolve());
  useEffect(() => {
    let mounted = true;
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (mounted)
          setState(
            restore(
              raw,
              products.map((p) => p.slug),
            ),
          );
      })
      .catch(() => {
        if (mounted) setStorageError(true);
      })
      .finally(() => {
        if (mounted) setReady(true);
      });
    return () => {
      mounted = false;
    };
  }, []);
  useEffect(() => {
    if (!ready) return;
    writeQueue.current = writeQueue.current
      .then(() => AsyncStorage.setItem(KEY, JSON.stringify(state)))
      .then(() => setStorageError(false))
      .catch(() => setStorageError(true));
  }, [state, ready]);
  useEffect(() => {
    const sub = BackHandler.addEventListener("hardwareBackPress", () => {
      if (selected) {
        setSelected(null);
        return true;
      }
      if (tab !== "Discover") {
        setTab("Discover");
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [tab, selected]);
  async function open(product: Product) {
    try {
      await Linking.openURL(product.url);
      setState((prev) => recordOpen(prev, product.slug));
    } catch {
      Alert.alert(
        "Could not open this app",
        "Check that a browser is installed and try again.",
      );
    }
  }
  async function link(url: string) {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert(
        "Could not open link",
        "Please try again with a browser installed.",
      );
    }
  }
  const saved = (id: string) => state.saved.includes(id);
  const toggle = (id: string) => setState((prev) => toggleSaved(prev, id));
  function card({ item }: { item: Product }) {
    return (
      <View style={s.productCard}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`View ${item.name}`}
          onPress={() => setSelected(item)}
          style={({ pressed }) => pressed && s.pressed}
        >
          <Artwork product={item} />
          <View style={s.cardCopy}>
            <Text style={s.category}>{item.category}</Text>
            <Text style={s.cardTitle}>{item.name}</Text>
            <Text numberOfLines={2} style={s.body}>
              {item.tagline}
            </Text>
          </View>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${saved(item.slug) ? "Unsave" : "Save"} ${item.name}`}
          accessibilityState={{ selected: saved(item.slug), disabled: !ready }}
          disabled={!ready}
          onPress={() => toggle(item.slug)}
          style={s.save}
        >
          <Icon
            name={saved(item.slug) ? "bookmark" : "bookmark-outline"}
            color={saved(item.slug) ? C.accent : C.text}
          />
        </Pressable>
      </View>
    );
  }
  const filtered = filterProducts(products, query, group);
  const featured = products[0];
  return (
    <SafeAreaView style={s.safe} edges={["top", "left", "right"]}>
      <StatusBar style="light" />
      <View style={s.brandRow}>
        <View style={s.brand}>
          <View style={s.mark}>
            <Text style={s.markText}>a.</Text>
          </View>
          <Text style={s.brandText}>
            avolab<Text style={{ color: C.accent }}> / hub</Text>
          </Text>
        </View>
        <View style={s.localBadge}>
          <View style={s.dot} />
          <Text style={s.small}>Your little app universe</Text>
        </View>
      </View>
      {storageError && (
        <Text accessibilityRole="alert" style={s.warning}>
          Device storage unavailable. Changes may not survive a restart.
        </Text>
      )}
      <View style={s.main}>
        {tab === "Discover" && (
          <FlatList
            data={filtered}
            keyExtractor={(p) => p.slug}
            renderItem={card}
            contentContainerStyle={s.list}
            keyboardShouldPersistTaps="handled"
            ListHeaderComponent={
              <View>
                <Text style={s.heading}>{"Good things.\nOne place."}</Text>
                <Text style={s.intro}>
                  Small tools, big ideas, and a little play.
                </Text>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Explore DashVerse"
                  onPress={() => setSelected(featured)}
                  style={s.feature}
                >
                  <Artwork product={featured} large />
                  <View style={s.featureShade}>
                    <Text style={s.featureTag}>Take a play break</Text>
                    <Text style={s.featureTitle}>
                      {"Meet your next\none-more-try."}
                    </Text>
                    <View style={s.inline}>
                      <Text style={s.featureLink}>Explore DashVerse</Text>
                      <Icon name="arrow-forward" size={18} />
                    </View>
                  </View>
                </Pressable>
                <Text style={s.section}>Find your next favourite</Text>
                <View style={s.search}>
                  <Icon name="search-outline" color={C.muted} />
                  <TextInput
                    accessibilityLabel="Search apps"
                    placeholder="Search apps, tools, games…"
                    placeholderTextColor={C.muted}
                    style={s.searchInput}
                    value={query}
                    onChangeText={setQuery}
                    autoCorrect={false}
                    returnKeyType="search"
                  />
                  {query !== "" && (
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel="Clear search"
                      onPress={() => setQuery("")}
                      style={s.clear}
                    >
                      <Icon name="close-circle" color={C.muted} />
                    </Pressable>
                  )}
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={s.chips}
                >
                  {["All", "Tools", "Games", "Audio"].map((g) => (
                    <Pressable
                      key={g}
                      accessibilityRole="button"
                      accessibilityState={{ selected: group === g }}
                      onPress={() => setGroup(g)}
                      style={[s.chip, group === g && s.activeChip]}
                    >
                      <Text
                        style={[s.chipText, group === g && { color: C.bg }]}
                      >
                        {g}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
                <Text style={s.resultCount}>
                  {filtered.length} {filtered.length === 1 ? "app" : "apps"} to
                  explore · opens in your browser
                </Text>
              </View>
            }
            ListEmptyComponent={
              <View style={s.empty}>
                <Icon name="search-outline" size={40} color={C.accent} />
                <Text style={s.section}>No matches yet</Text>
                <Text style={s.body}>Try a different name or choose All.</Text>
                <Button
                  label="Reset search"
                  onPress={() => {
                    setQuery("");
                    setGroup("All");
                  }}
                />
              </View>
            }
          />
        )}
        {tab === "Library" && (
          <FlatList
            data={products.filter((p) => saved(p.slug))}
            keyExtractor={(p) => p.slug}
            renderItem={card}
            contentContainerStyle={s.list}
            ListHeaderComponent={
              <View>
                <Text style={s.heading}>Made yours.</Text>
                <Text style={s.intro}>
                  Your favourites stay here, even offline.
                </Text>
                {state.recent.length > 0 && (
                  <>
                    <Text style={s.section}>Recently opened</Text>
                    <ScrollView
                      horizontal
                      contentContainerStyle={s.recentRow}
                      showsHorizontalScrollIndicator={false}
                    >
                      {state.recent.map((id) => {
                        const p = products.find((p) => p.slug === id)!;
                        return (
                          <Pressable
                            key={id}
                            accessibilityRole="button"
                            onPress={() => setSelected(p)}
                            style={s.recentItem}
                          >
                            <View
                              style={[
                                s.recentIcon,
                                {
                                  backgroundColor:
                                    p.accent || p.poster?.from || C.card,
                                },
                              ]}
                            >
                              <Text style={s.initial}>{p.name.charAt(0)}</Text>
                            </View>
                            <Text numberOfLines={1} style={s.recentName}>
                              {p.name}
                            </Text>
                          </Pressable>
                        );
                      })}
                    </ScrollView>
                  </>
                )}
                <Text style={s.section}>Saved apps · {state.saved.length}</Text>
              </View>
            }
            ListEmptyComponent={
              <View style={s.empty}>
                <Icon name="bookmarks-outline" size={46} color={C.accent} />
                <Text style={s.section}>Keep the good ones close.</Text>
                <Text style={s.body}>
                  Tap a bookmark on any app to save it here. No account needed.
                </Text>
                <Button
                  label="Find an app"
                  onPress={() => setTab("Discover")}
                />
              </View>
            }
          />
        )}
        {tab === "Play" && (
          <ScrollView contentContainerStyle={s.list}>
            <Text style={s.heading}>{"A little play\ngoes a long way."}</Text>
            <Text style={s.intro}>
              Start with something that lives right here.
            </Text>
            <ReactionGame
              best={state.best}
              onScore={(ms) => setState((prev) => recordScore(prev, ms))}
              enabled={ready}
            />
            <Text style={s.section}>More from the arcade</Text>
            <Text style={[s.body, { marginBottom: 20 }]}>
              These games open online in your browser. Their device support may
              vary.
            </Text>
            {products
              .filter((p) => p.group === "Games")
              .map((p) => (
                <View key={p.slug}>{card({ item: p })}</View>
              ))}
          </ScrollView>
        )}
        {tab === "About" && (
          <ScrollView contentContainerStyle={s.list}>
            <Text style={s.heading}>{"Small studio.\nCurious by nature."}</Text>
            <Text style={s.intro}>
              Avolab makes useful things and playful experiments. This is your
              home base for exploring them.
            </Text>
            <View style={s.infoCard}>
              <Icon name="phone-portrait-outline" color={C.accent} size={32} />
              <Text style={s.section}>A hub, not another account.</Text>
              <Text style={s.body}>
                Search the bundled catalogue, save favourites, and play Pulse
                without a connection. Your library, recent apps, and best score
                are stored only on this device.
              </Text>
            </View>
            <View style={s.infoCard}>
              <Text style={s.section}>Know what opens where</Text>
              <Text style={s.body}>
                The hub is a native app. Listed products open in your browser
                and have their own accounts, policies, and internet
                requirements. The catalogue is bundled with this version, not a
                live status feed.
              </Text>
            </View>
            <Button
              label="Visit avolab.ca"
              onPress={() => void link("https://avolab.ca")}
              secondary
            />
            <Button
              label="Privacy policy"
              onPress={() => void link("https://avolab.ca/privacy")}
              secondary
            />
            <Button
              label="Terms of use"
              onPress={() => void link("https://avolab.ca/terms")}
              secondary
            />
            <Button
              label="Clear device data"
              secondary
              onPress={() =>
                Alert.alert(
                  "Clear your hub?",
                  "This removes favourites, recently opened apps, and your Pulse best score.",
                  [
                    { text: "Cancel", style: "cancel" },
                    {
                      text: "Clear data",
                      style: "destructive",
                      onPress: () => setState({ ...EMPTY }),
                    },
                  ],
                )
              }
            />
            <Text style={[s.small, { textAlign: "center", marginTop: 24 }]}>
              Avolab Hub · 0.1.0 · Android preview
            </Text>
          </ScrollView>
        )}
      </View>
      <SafeAreaView edges={["bottom"]} style={s.navSafe}>
        <View style={s.nav}>
          {tabs.map((t) => (
            <Pressable
              key={t.name}
              accessibilityRole="tab"
              accessibilityState={{ selected: tab === t.name }}
              accessibilityLabel={t.name}
              onPress={() => setTab(t.name)}
              style={s.navItem}
            >
              <View style={[s.navIcon, tab === t.name && s.navIconActive]}>
                <Icon
                  name={t.icon}
                  color={tab === t.name ? C.accent : C.muted}
                />
              </View>
              <Text
                style={[
                  s.navLabel,
                  { color: tab === t.name ? C.text : C.muted },
                ]}
              >
                {t.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </SafeAreaView>
      <Modal
        visible={!!selected}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={() => setSelected(null)}
      >
        {selected && (
          <SafeAreaView style={s.safe}>
            <View style={s.detailTop}>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Close app details"
                onPress={() => setSelected(null)}
                style={s.roundButton}
              >
                <Icon name="arrow-back" />
              </Pressable>
              <Text style={s.detailLabel}>Inside the universe</Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Share ${selected.name}`}
                onPress={() =>
                  void Share.share({
                    message: `${selected.name} — ${selected.url}`,
                  }).catch(() => Alert.alert("Could not share", "Try again."))
                }
                style={s.roundButton}
              >
                <Icon name="share-outline" />
              </Pressable>
            </View>
            <ScrollView contentContainerStyle={s.list}>
              <Artwork product={selected} large />
              <Text style={[s.category, { marginTop: 24 }]}>
                {selected.category}
              </Text>
              <Text style={s.heading}>{selected.name}</Text>
              <Text style={s.intro}>{selected.tagline}</Text>
              <View style={s.infoCard}>
                <View style={s.inline}>
                  <Icon name="globe-outline" color={C.accent} />
                  <Text style={s.cardTitle}>Opens in your browser</Text>
                </View>
                <Text style={s.body}>{new URL(selected.url).hostname}</Text>
                <Text style={s.body}>
                  Internet required. Availability and mobile support depend on
                  the product.
                </Text>
              </View>
              <Button
                label={`Open ${selected.name}`}
                onPress={() => void open(selected)}
              />
              <Button
                label={
                  saved(selected.slug)
                    ? "Remove from saved"
                    : "Save to your library"
                }
                secondary
                onPress={() => toggle(selected.slug)}
              />
            </ScrollView>
          </SafeAreaView>
        )}
      </Modal>
    </SafeAreaView>
  );
}
function ReactionGame({
  best,
  onScore,
  enabled,
}: {
  best: number | null;
  onScore: (ms: number) => void;
  enabled: boolean;
}) {
  const [phase, setPhase] = useState<"idle" | "wait" | "go" | "early" | "done">(
    "idle",
  );
  const [score, setScore] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const start = useRef(0);
  const stage = useRef(phase);
  function change(next: typeof phase) {
    stage.current = next;
    setPhase(next);
  }
  function cancel() {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  }
  useEffect(() => {
    const sub = AppState.addEventListener("change", (status) => {
      if (status !== "active") {
        cancel();
        change("idle");
      }
    });
    return () => {
      cancel();
      sub.remove();
    };
  }, []);
  function tap() {
    if (!enabled) return;
    if (stage.current === "wait") {
      cancel();
      change("early");
    } else if (stage.current === "go") {
      const ms = Math.max(1, Math.round(performance.now() - start.current));
      setScore(ms);
      onScore(ms);
      change("done");
    } else {
      change("wait");
      timer.current = setTimeout(
        () => {
          start.current = performance.now();
          change("go");
        },
        1400 + Math.random() * 2400,
      );
    }
  }
  const title =
    phase === "wait"
      ? "Wait for mint…"
      : phase === "go"
        ? "Tap now!"
        : phase === "early"
          ? "A little too soon."
          : phase === "done"
            ? `${score} ms`
            : "Find your fast.";
  return (
    <View style={s.gameCard}>
      <View style={s.gameTitle}>
        <View>
          <Text style={s.cardTitle}>Pulse</Text>
          <Text style={s.small}>A native reaction game · works offline</Text>
        </View>
        <Icon name="flash-outline" color={C.accent} />
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={
          phase === "go"
            ? "Tap now"
            : phase === "wait"
              ? "Wait for mint"
              : "Start Pulse round"
        }
        accessibilityState={{ disabled: !enabled }}
        disabled={!enabled}
        onPress={tap}
        style={[s.pulse, phase === "go" && { backgroundColor: "#9ef0cd" }]}
      >
        <View
          style={[s.pulseRing, phase === "go" && { borderColor: "#386a58" }]}
        >
          <Icon
            name={
              phase === "wait"
                ? "hourglass-outline"
                : phase === "go"
                  ? "flash"
                  : "finger-print-outline"
            }
            size={52}
            color={phase === "go" ? "#123d2c" : C.accent}
          />
        </View>
        <Text
          accessibilityLiveRegion="polite"
          style={[s.pulseTitle, phase === "go" && { color: "#123d2c" }]}
        >
          {title}
        </Text>
        <Text style={[s.small, phase === "go" && { color: "#123d2c" }]}>
          {phase === "wait"
            ? "Hold steady. Don’t tap yet."
            : phase === "go"
              ? "Go, go, go."
              : phase === "idle"
                ? "Tap to start. Wait for mint, then tap again."
                : "Tap for another round."}
        </Text>
      </Pressable>
      <Text style={s.best}>
        {best === null
          ? "Your first best is waiting."
          : `Personal best  ${best} ms`}
      </Text>
      <Text style={s.small}>
        Colour isn’t the only cue: look for “Tap now!”
      </Text>
    </View>
  );
}
const s = StyleSheet.create({
  safe: { flex: 1, backgroundColor: C.bg },
  main: { flex: 1 },
  brandRow: { paddingHorizontal: 22, paddingTop: 12, paddingBottom: 16 },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  mark: {
    width: 34,
    height: 34,
    backgroundColor: C.accent,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  markText: { fontSize: 28, fontWeight: "900", color: C.bg, marginTop: -3 },
  brandText: {
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -1,
    color: C.text,
  },
  localBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 10,
  },
  dot: { width: 5, height: 5, borderRadius: 3, backgroundColor: "#9ef0cd" },
  small: { color: C.muted, fontSize: 12, lineHeight: 18 },
  list: { padding: 22, paddingTop: 12, paddingBottom: 32 },
  heading: {
    fontSize: 39,
    lineHeight: 44,
    fontWeight: "800",
    letterSpacing: -1.7,
    color: C.text,
    marginBottom: 12,
    marginTop: 8,
  },
  intro: { fontSize: 16, lineHeight: 25, color: C.muted, marginBottom: 26 },
  feature: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 28,
    backgroundColor: C.card,
  },
  featureShade: { backgroundColor: "#252039", padding: 22 },
  featureTag: { color: "#d1c3ff", fontSize: 13, marginBottom: 8 },
  featureTitle: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: "800",
    color: C.text,
    letterSpacing: -0.6,
    marginBottom: 16,
  },
  featureLink: { fontSize: 14, color: C.text, fontWeight: "700" },
  inline: { flexDirection: "row", alignItems: "center", gap: 10 },
  art: { height: 150, width: "100%", backgroundColor: C.card },
  artLarge: { height: 190, borderRadius: 20 },
  poster: { alignItems: "center", justifyContent: "center" },
  section: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
    color: C.text,
    marginBottom: 14,
    marginTop: 12,
    letterSpacing: -0.5,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.card,
    borderRadius: 16,
    paddingLeft: 16,
    minHeight: 54,
  },
  searchInput: { flex: 1, fontSize: 15, color: C.text, padding: 14 },
  clear: { padding: 12 },
  chips: { gap: 9, paddingVertical: 16 },
  chip: {
    minHeight: 44,
    paddingHorizontal: 20,
    borderRadius: 22,
    backgroundColor: C.card,
    justifyContent: "center",
  },
  activeChip: { backgroundColor: C.accent },
  chipText: { color: C.muted, fontSize: 14, fontWeight: "600" },
  resultCount: { color: C.muted, fontSize: 12, marginBottom: 20 },
  productCard: {
    backgroundColor: C.card,
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 18,
  },
  cardCopy: { padding: 18, paddingRight: 56 },
  category: {
    color: "#c0aaff",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 7,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: C.text,
    marginBottom: 7,
    letterSpacing: -0.4,
  },
  body: { color: C.muted, fontSize: 14, lineHeight: 22 },
  save: {
    position: "absolute",
    right: 8,
    bottom: 20,
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: C.accent,
    minHeight: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    marginTop: 12,
    paddingHorizontal: 18,
  },
  secondary: { backgroundColor: C.card, borderWidth: 1, borderColor: C.line },
  buttonText: { fontSize: 15, fontWeight: "700", color: C.bg },
  pressed: { opacity: 0.7 },
  empty: { paddingVertical: 30, alignItems: "center", gap: 10 },
  recentRow: { gap: 16, paddingBottom: 20 },
  recentItem: { width: 80, alignItems: "center", gap: 9 },
  recentIcon: {
    width: 58,
    height: 58,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  initial: { color: "#0a0a0f", fontSize: 28, fontWeight: "900" },
  recentName: { fontSize: 12, color: C.text },
  infoCard: {
    backgroundColor: C.card,
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    gap: 8,
  },
  navSafe: {
    backgroundColor: "#11111b",
    borderTopWidth: 1,
    borderColor: C.line,
  },
  nav: { flexDirection: "row", paddingVertical: 7, paddingHorizontal: 10 },
  navItem: { flex: 1, alignItems: "center", paddingVertical: 3, minHeight: 58 },
  navIcon: {
    width: 56,
    height: 30,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  navIconActive: { backgroundColor: "#2b2241" },
  navLabel: { fontSize: 11, marginTop: 5, fontWeight: "600" },
  detailTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
  },
  roundButton: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
  },
  detailLabel: { color: C.muted, fontSize: 13 },
  gameCard: {
    backgroundColor: C.card,
    borderRadius: 24,
    padding: 18,
    marginBottom: 22,
  },
  gameTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  pulse: {
    height: 260,
    backgroundColor: "#252039",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
  },
  pulseRing: {
    borderWidth: 2,
    borderColor: "#59457a",
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  pulseTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: C.text,
    marginBottom: 10,
  },
  best: {
    color: C.text,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginVertical: 18,
  },
  warning: {
    backgroundColor: "#492922",
    padding: 10,
    color: "#ffe0bc",
    fontSize: 12,
  },
});
