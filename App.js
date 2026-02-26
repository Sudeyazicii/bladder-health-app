import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity, ScrollView,
  SafeAreaView, Platform, StatusBar, Modal, TextInput, Animated, Easing, Switch
} from 'react-native';
import {
  Droplet, BookOpen, Gamepad2, User, Activity, Bell, ShieldCheck,
  Apple, AlertTriangle, ChevronDown, ChevronUp, Play, Plus, X
} from 'lucide-react-native';

const PRIMARY = '#FF9F43';
const PRIMARY_LIGHT = '#FFB56B';
const SECONDARY = '#26DEBC';
const BG_COLOR = '#F8F9FA';
const TEXT_MAIN = '#2D3436';
const TEXT_MUTED = '#636E72';

export default function App() {
  const [currentRole, setCurrentRole] = useState(null); // 'Parent' or 'Child'
  const [currentTab, setCurrentTab] = useState('Home'); // 'Home', 'Education', 'Games', 'Account', 'Profile'

  const goHome = () => {
    setCurrentRole(null);
    setCurrentTab('Home');
  };

  const renderScreen = () => {
    if (!currentRole || currentTab === 'Home') return <HomeScreen setRole={setCurrentRole} setTab={setCurrentTab} />;

    switch (currentTab) {
      case 'Education': return <EducationScreen />;
      case 'Games': return <GamesScreen setTab={setCurrentTab} />;
      case 'PlayGame': return <PlayGameScreen setTab={setCurrentTab} />;
      case 'PlayFruitGame': return <PlayFruitGameScreen setTab={setCurrentTab} />;
      case 'Account': return <AccountScreen />;
      case 'Profile': return <ProfileScreen />;
      default: return <HomeScreen setRole={setCurrentRole} setTab={setCurrentTab} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={BG_COLOR} />

      {currentRole && currentTab !== 'Home' && (
        <View style={styles.topHeader}>
          <TouchableOpacity style={styles.backBtn} onPress={goHome}>
            <X color={TEXT_MAIN} size={28} />
          </TouchableOpacity>
          <Text style={styles.headerRoleText}>{currentRole === 'Parent' ? 'Ebeveyn Modu' : 'Çocuk Modu'}</Text>
          <View style={{ width: 38 }} />
        </View>
      )}

      <View style={styles.screenContent}>
        {renderScreen()}
      </View>

      {currentRole === 'Child' && currentTab !== 'Home' && currentTab !== 'PlayGame' && currentTab !== 'PlayFruitGame' && (
        <View style={styles.bottomNav}>
          <NavItem icon={BookOpen} label="Eğitim" active={currentTab === 'Education'} onPress={() => setCurrentTab('Education')} />
          <NavItem icon={Gamepad2} label="Oyunlar" active={currentTab === 'Games'} onPress={() => setCurrentTab('Games')} />
        </View>
      )}

      {currentRole === 'Parent' && currentTab !== 'Home' && (
        <View style={styles.bottomNav}>
          <NavItem icon={BookOpen} label="Bilgi" active={currentTab === 'Education'} onPress={() => setCurrentTab('Education')} />
          <NavItem icon={Activity} label="Günlük" active={currentTab === 'Account'} onPress={() => setCurrentTab('Account')} />
          <NavItem icon={User} label="Profil" active={currentTab === 'Profile'} onPress={() => setCurrentTab('Profile')} />
        </View>
      )}
    </SafeAreaView>
  );
}

function NavItem({ icon: Icon, label, active, onPress }) {
  return (
    <TouchableOpacity style={styles.navItem} onPress={onPress}>
      <Icon color={active ? PRIMARY : TEXT_MUTED} size={24} style={{ marginBottom: 4 }} />
      <Text style={[styles.navText, active && { color: PRIMARY }]}>{label}</Text>
      {active && <View style={styles.navDot} />}
    </TouchableOpacity>
  );
}

// ---------------- SCREENS ----------------

function HomeScreen({ setRole, setTab }) {
  const selectRole = (role, initialTab) => {
    setRole(role);
    setTab(initialTab);
  };
  return (
    <View style={[styles.flex1, styles.center]}>
      <View style={styles.mascotSection}>
        <View style={styles.mascotCircle}>
          <Droplet color={PRIMARY} fill={PRIMARY_LIGHT} size={100} strokeWidth={1.5} />
        </View>
        <Text style={styles.welcomeText}>Mesane Sağlığı{'\n'}Serüveni</Text>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity style={[styles.roleBtn, { backgroundColor: SECONDARY }]} onPress={() => selectRole('Parent', 'Account')}>
          <Text style={styles.btnTitle}>Ebeveyn</Text>
          <Text style={styles.btnSubtitle}>Kayıt ve Takip</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.roleBtn, { backgroundColor: PRIMARY }]} onPress={() => selectRole('Child', 'Games')}>
          <Text style={styles.btnTitle}>Çocuk</Text>
          <Text style={styles.btnSubtitle}>Eğlence Zamanı</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function EducationScreen() {
  const [openId, setOpenId] = useState(1);
  return (
    <ScrollView contentContainerStyle={styles.scrollPad}>
      <Text style={[styles.screenTitle, { color: PRIMARY }]}>Eğitim Merkezi 🎓</Text>

      <Accordion
        id={1}
        title="Mesane Anatomisi"
        icon={<Activity color={PRIMARY} size={24} />}
        isOpen={openId === 1}
        onToggle={() => setOpenId(openId === 1 ? null : 1)}
      >
        <View style={styles.eduCard}>
          <View style={styles.centerPad}>
            <Droplet color={SECONDARY} size={48} />
          </View>
          <Text style={styles.p}>Mesane, idrarı depolayan kaslı bir kesedir. Böbreklerden gelen idrar göllenir ve dolduğunda tuvalete gitme hissi uyanır.</Text>
          <View style={styles.alertBox}>
            <AlertTriangle color="#D63031" size={20} />
            <Text style={styles.alertText}>Önemli Uyarı: İdrar bekletilmemeli! Sıkışma hissi geldiğinde hemen tuvalete gidilmelidir.</Text>
          </View>
        </View>
      </Accordion>

      <Accordion
        id={2}
        title="Sağlıklı Beslenme ve Sıvı Tüketimi"
        icon={<Apple color={SECONDARY} size={24} />}
        isOpen={openId === 2}
        onToggle={() => setOpenId(openId === 2 ? null : 2)}
      >
        <View style={styles.eduCard}>
          <Text style={styles.p}>Günde en az 6-8 bardak su içmek mesane sağlığı için çok önemlidir. Suyun yanı sıra lifli gıdalar (meyve, sebze, yulaf) tüketmek kabızlığı önler ve mesaneyi rahatlatır.</Text>
        </View>
      </Accordion>

      <Accordion
        id={3}
        title="Doğru Tuvalet Oturuşu"
        icon={<User color={PRIMARY} size={24} />}
        isOpen={openId === 3}
        onToggle={() => setOpenId(openId === 3 ? null : 3)}
      >
        <View style={styles.eduCard}>
          <Text style={styles.p}>Çocuklar tuvalete oturduğunda ayakları boşta kalmamalıdır! Ayakların altına bir tabure koymak, karın kaslarının tam gevşemesini ve idrarın rahat boşalmasını sağlar.</Text>
        </View>
      </Accordion>
    </ScrollView>
  );
}

function Accordion({ title, icon, isOpen, onToggle, children }) {
  return (
    <View style={styles.accordionItem}>
      <TouchableOpacity style={styles.accordionHeader} onPress={onToggle}>
        <View style={styles.row}>
          {icon}
          <Text style={styles.accordionTitle}>{title}</Text>
        </View>
        {isOpen ? <ChevronUp color={TEXT_MAIN} size={20} /> : <ChevronDown color={TEXT_MAIN} size={20} />}
      </TouchableOpacity>
      {isOpen && <View style={styles.accordionBody}>{children}</View>}
    </View>
  );
}

function GamesScreen({ setTab }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollPad}>
      <Text style={[styles.screenTitle, { color: SECONDARY }]}>Eğlence Vakti 🎮</Text>

      <TouchableOpacity style={[styles.gameCard, { backgroundColor: '#F0FDF8' }]} onPress={() => setTab('PlayGame')}>
        <View style={styles.gameImageWrapper}>
          <Text style={styles.emoji}>💧</Text>
        </View>
        <View style={styles.gameInfo}>
          <Text style={styles.h3}>Su Damlası Yakala!</Text>
          <Text style={styles.pSmall}>Bol bol su içmek için düşen damlaları topla. Mesane sağlığın için çok önemli!</Text>
          <TouchableOpacity style={[styles.playBtn, { backgroundColor: SECONDARY }]} onPress={() => setTab('PlayGame')}>
            <Play color="#fff" size={14} fill="#fff" />
            <Text style={styles.playBtnText}>Hemen Oyna</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.gameCard, { backgroundColor: '#FFF5F5' }]} onPress={() => setTab('PlayFruitGame')}>
        <View style={styles.gameImageWrapper}><Text style={styles.emoji}>🍎</Text></View>
        <View style={styles.gameInfo}>
          <Text style={styles.h3}>Meyve Sepeti</Text>
          <Text style={styles.pSmall}>Sağlıklı sindirim için yukarıdan düşen lifli meyveleri topla!</Text>
          <TouchableOpacity style={[styles.playBtn, { backgroundColor: PRIMARY }]} onPress={() => setTab('PlayFruitGame')}>
            <Play color="#fff" size={14} fill="#fff" />
            <Text style={styles.playBtnText}>Hemen Oyna</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

function PlayGameScreen({ setTab }) {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const dropAnim = useRef(new Animated.Value(0)).current;

  // Simple game loop mechanism
  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    dropAnim.setValue(0);
    animateDrop();
  };

  const animateDrop = () => {
    dropAnim.setValue(0);
    Animated.timing(dropAnim, {
      toValue: 700, // screen height approx
      duration: Math.random() * 1000 + 1000, // randomized drop speed
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      // If it hit bottom naturally, restart drop, but score isn't incremented
      if (finished && isPlaying) {
        animateDrop();
      }
    });
  };

  const catchDrop = () => {
    if (!isPlaying) return;
    setScore(s => s + 10);
    dropAnim.stopAnimation();
    dropAnim.setValue(0); // reset to top immediately
    animateDrop(); // send another one
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timerId = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerId);
          setIsPlaying(false);
          dropAnim.stopAnimation();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isPlaying]);

  return (
    <View style={[styles.flex1, { backgroundColor: '#F0FDF8' }]}>
      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd', zIndex: 10 }}>
        <Text style={[styles.screenTitle, { color: SECONDARY, marginBottom: 0 }]}>Damla Yakalama 💧</Text>
        <View style={[styles.row, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Skor: {score}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: timeLeft > 5 ? TEXT_MAIN : '#D63031' }}>Süre: {timeLeft}s</Text>
        </View>
      </View>

      {!isPlaying && score === 0 && (
        <View style={styles.center}>
          <Text style={[styles.p, { marginVertical: 40, textAlign: 'center' }]}>Yukarıdan düşen su damlalarına tıklayarak{'\n'}hızlıca topla ve skor kazan!</Text>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: SECONDARY, paddingHorizontal: 40 }]} onPress={startGame}>
            <Text style={styles.saveBtnText}>Oyuna Başla</Text>
          </TouchableOpacity>
        </View>
      )}

      {isPlaying && (
        <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Animated.View style={{
            position: 'absolute',
            left: '40%', // Fixed horizontal for this simple MVP
            transform: [{ translateY: dropAnim }]
          }}>
            <TouchableOpacity onPress={catchDrop} activeOpacity={0.8}>
              <View style={[styles.mascotCircle, { borderColor: SECONDARY, width: 80, height: 80, borderWidth: 2 }]}>
                <Droplet color={SECONDARY} fill={SECONDARY} size={40} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {!isPlaying && score > 0 && (
        <View style={styles.center}>
          <Text style={[styles.screenTitle, { marginTop: 60, fontSize: 36 }]}>Oyun Bitti!</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: SECONDARY, marginBottom: 20 }}>Toplam Skor: {score}</Text>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: PRIMARY, paddingHorizontal: 40 }]} onPress={startGame}>
            <Text style={styles.saveBtnText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

function PlayFruitGameScreen({ setTab }) {
  const [score, setScore] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const fruitAnim = useRef(new Animated.Value(0)).current;

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    fruitAnim.setValue(0);
    animateFruit();
  };

  const animateFruit = () => {
    fruitAnim.setValue(0);
    Animated.timing(fruitAnim, {
      toValue: 700,
      duration: Math.random() * 800 + 900,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && isPlaying) animateFruit();
    });
  };

  const catchFruit = () => {
    if (!isPlaying) return;
    setScore(s => s + 5);
    fruitAnim.stopAnimation();
    fruitAnim.setValue(0);
    animateFruit();
  };

  useEffect(() => {
    if (!isPlaying) return;
    const timerId = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(timerId);
          setIsPlaying(false);
          fruitAnim.stopAnimation();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerId);
  }, [isPlaying]);

  return (
    <View style={[styles.flex1, { backgroundColor: '#FFF5F5' }]}>
      <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#ddd', zIndex: 10 }}>
        <Text style={[styles.screenTitle, { color: PRIMARY, marginBottom: 0 }]}>Meyve Sepeti 🍎</Text>
        <View style={[styles.row, { justifyContent: 'space-between', width: '100%', marginTop: 10 }]}>
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Skor: {score}</Text>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: timeLeft > 5 ? TEXT_MAIN : '#D63031' }}>Süre: {timeLeft}s</Text>
        </View>
      </View>

      {!isPlaying && score === 0 && (
        <View style={styles.center}>
          <Text style={[styles.p, { marginVertical: 40, textAlign: 'center' }]}>Yukarıdan düşen meyvelere tıklayarak{'\n'}hızlıca topla ve skor kazan!</Text>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: PRIMARY, paddingHorizontal: 40 }]} onPress={startGame}>
            <Text style={styles.saveBtnText}>Oyuna Başla</Text>
          </TouchableOpacity>
        </View>
      )}

      {isPlaying && (
        <View style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <Animated.View style={{
            position: 'absolute', left: '40%', transform: [{ translateY: fruitAnim }]
          }}>
            <TouchableOpacity onPress={catchFruit} activeOpacity={0.8}>
              <View style={[styles.mascotCircle, { borderColor: PRIMARY, width: 80, height: 80, borderWidth: 2 }]}>
                <Apple color={PRIMARY} fill={PRIMARY} size={40} />
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}

      {!isPlaying && score > 0 && (
        <View style={styles.center}>
          <Text style={[styles.screenTitle, { marginTop: 60, fontSize: 36 }]}>Oyun Bitti!</Text>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: PRIMARY, marginBottom: 20 }}>Toplam Skor: {score}</Text>
          <TouchableOpacity style={[styles.saveBtn, { backgroundColor: SECONDARY, paddingHorizontal: 40 }]} onPress={startGame}>
            <Text style={styles.saveBtnText}>Tekrar Oyna</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

function AccountScreen() {
  const [data, setData] = useState([
    { id: 1, day: 'Pzt', awake: '3 kez', asleep: 'Kuru' },
    { id: 2, day: 'Salı', awake: '4 kez', asleep: '1 kez ıslak' },
    { id: 3, day: 'Çarş', awake: '2 kez', asleep: 'Kuru' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState({ day: '', awake: '', asleep: '' });

  const handleSave = () => {
    if (form.day) {
      setData([...data, { id: Date.now(), ...form }]);
      setForm({ day: '', awake: '', asleep: '' });
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.flex1}>
      <ScrollView contentContainerStyle={styles.scrollPad}>
        <Text style={[styles.screenTitle, { color: PRIMARY }]}>İşeme Günlüğü 📝</Text>

        <View style={styles.table}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.th}>Gün</Text>
            <Text style={styles.th}>Uyanık</Text>
            <Text style={styles.th}>Uyurken</Text>
          </View>
          {data.map((row, i) => (
            <View key={row.id} style={[styles.tableRow, i % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd]}>
              <Text style={[styles.td, styles.bold]}>{row.day}</Text>
              <Text style={styles.td}>{row.awake}</Text>
              <Text style={styles.td}>{row.asleep}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Plus color="#fff" size={32} />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.bottomSheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.h3}>Yeni Kayıt Ekle</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X color={TEXT_MUTED} size={24} />
              </TouchableOpacity>
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Gün</Text>
              <TextInput style={styles.input} placeholder="Örn: Perşembe" value={form.day} onChangeText={(t) => setForm({ ...form, day: t })} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Uyanık Durum</Text>
              <TextInput style={styles.input} placeholder="Örn: 2 kez kaçırma" value={form.awake} onChangeText={(t) => setForm({ ...form, awake: t })} />
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Gece Durumu</Text>
              <TextInput style={styles.input} placeholder="Örn: Kuru / Islak" value={form.asleep} onChangeText={(t) => setForm({ ...form, asleep: t })} />
            </View>

            <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Text style={styles.saveBtnText}>Kaydet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

function ProfileScreen() {
  const [notifications, setNotifications] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.scrollPad}>
      <Text style={[styles.screenTitle, { color: PRIMARY }]}>Ebeveyn Ayarları ⚙️</Text>

      <View style={styles.profileSection}>
        <Text style={styles.h3}>Genel Ayarlar</Text>
        <View style={styles.settingRow}>
          <View style={styles.row}>
            <Bell color={TEXT_MUTED} size={22} style={{ marginRight: 10 }} />
            <Text style={styles.settingLabel}>Günlük Hatırlatıcılar (Su, Tuvalet)</Text>
          </View>
          <Switch
            trackColor={{ false: "#ddd", true: PRIMARY_LIGHT }}
            thumbColor={notifications ? PRIMARY : "#f4f3f4"}
            onValueChange={() => setNotifications(!notifications)}
            value={notifications}
          />
        </View>
      </View>

      <View style={styles.profileSection}>
        <Text style={styles.h3}>Raporlama</Text>
        <TouchableOpacity style={styles.settingRowAction}>
          <ShieldCheck color={SECONDARY} size={22} style={{ marginRight: 10 }} />
          <Text style={[styles.settingLabel, { color: SECONDARY, fontWeight: 'bold' }]}>Haftalık Raporu Doktorla Paylaş (PDF)</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.eduCard}>
        <Text style={styles.p}>Not: Gece yatak ıslatma (Enürezis Nokturna) tedavisi uzman hekimlerce (Örn. Çocuk Ürolojisi) düzenlenmelidir. Bu uygulama medikal bir tedavi değil, sadece bir takip/eğitim aracıdır.</Text>
      </View>
    </ScrollView>
  )
}

// ---------------- STYLES ----------------

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG_COLOR },
  topHeader: { height: 50, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, backgroundColor: BG_COLOR },
  backBtn: { padding: 5, backgroundColor: 'rgba(0,0,0,0.05)', borderRadius: 20 },
  screenContent: { flex: 1 },
  flex1: { flex: 1 },
  center: { justifyContent: 'center', alignItems: 'center' },
  scrollPad: { padding: 20, paddingBottom: 100 },
  row: { flexDirection: 'row', alignItems: 'center' },

  // Home
  mascotSection: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mascotCircle: { width: 180, height: 180, borderRadius: 90, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', borderWidth: 4, borderColor: PRIMARY_LIGHT, marginBottom: 20 },
  welcomeText: { fontSize: 32, fontWeight: 'bold', color: '#E68A3B', textAlign: 'center' },
  actionsSection: { flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 40, width: '100%', gap: 10 },
  roleBtn: { flex: 1, paddingVertical: 24, borderRadius: 16, alignItems: 'center', marginHorizontal: 5 },
  btnTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold', marginBottom: 4 },
  btnSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: '600' },

  // Shared
  screenTitle: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  h3: { fontSize: 18, fontWeight: 'bold', color: TEXT_MAIN },
  p: { fontSize: 15, color: TEXT_MUTED, lineHeight: 22 },
  pSmall: { fontSize: 13, color: TEXT_MUTED, marginTop: 4, marginBottom: 8 },
  bold: { fontWeight: 'bold' },

  // Education
  accordionItem: { backgroundColor: '#fff', borderRadius: 16, marginBottom: 14, overflow: 'hidden', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
  accordionHeader: { flexDirection: 'row', justifyContent: 'space-between', padding: 18, alignItems: 'center' },
  accordionTitle: { fontSize: 17, fontWeight: 'bold', marginLeft: 12, color: TEXT_MAIN },
  accordionBody: { backgroundColor: '#fafafa' },
  eduCard: { margin: 16, marginTop: 0, padding: 18, backgroundColor: '#fff', borderRadius: 12, borderLeftWidth: 5, borderLeftColor: SECONDARY, elevation: 1, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2 },
  centerPad: { alignItems: 'center', paddingVertical: 10 },
  alertBox: { flexDirection: 'row', backgroundColor: 'rgba(255, 118, 117, 0.1)', borderColor: 'rgba(255, 118, 117, 0.3)', borderWidth: 1, padding: 12, borderRadius: 8, marginTop: 16 },
  alertText: { flex: 1, marginLeft: 8, color: '#D63031', fontSize: 13 },

  // Games
  gameCard: { flexDirection: 'row', backgroundColor: '#fff', borderRadius: 20, padding: 14, marginBottom: 14, alignItems: 'center', elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 5 },
  gameImageWrapper: { width: 75, height: 75, borderRadius: 14, backgroundColor: BG_COLOR, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  emoji: { fontSize: 40 },
  gameInfo: { flex: 1, alignItems: 'flex-start' },
  playBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: PRIMARY, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20 },
  playBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginLeft: 6 },

  // Account
  table: { backgroundColor: '#fff', borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#eee', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 3 },
  tableHeaderRow: { flexDirection: 'row', backgroundColor: PRIMARY_LIGHT },
  tableRow: { flexDirection: 'row' },
  tableRowEven: { backgroundColor: '#FDFDFD' },
  tableRowOdd: { backgroundColor: '#fff' },
  th: { flex: 1, padding: 14, color: '#fff', fontWeight: 'bold', fontSize: 15 },
  td: { flex: 1, padding: 14, color: TEXT_MAIN, fontSize: 14, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
  fab: { position: 'absolute', bottom: 30, right: 25, width: 66, height: 66, borderRadius: 33, backgroundColor: SECONDARY, justifyContent: 'center', alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 5 },

  // Modal / Bottom Sheet
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  bottomSheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24 },
  sheetHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  formGroup: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: 'bold', color: TEXT_MUTED, marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, fontSize: 16 },
  saveBtn: { backgroundColor: PRIMARY, padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  saveBtnText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },

  // Settings Profile
  profileSection: { backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 16, borderWidth: 1, borderColor: '#eee' },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 15, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  settingRowAction: { flexDirection: 'row', alignItems: 'center', marginTop: 15, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  settingLabel: { fontSize: 15, color: TEXT_MAIN },

  // Navigation
  bottomNav: { flexDirection: 'row', height: 65, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f0f0f0', elevation: 10 },
  navItem: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  navText: { fontSize: 11, fontWeight: 'bold', color: TEXT_MUTED },
  navDot: { position: 'absolute', bottom: 8, width: 4, height: 4, borderRadius: 2, backgroundColor: PRIMARY }
});
