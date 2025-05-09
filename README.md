# Лошадинные скачки (Expo React Native)

Пиксельная аркада со скачками для 5 лошадей.  
Соревнуйтесь, запускайте гонки и получайте пуш-уведомление о победителе!

 Функции

- Анимированные скачки лошадей
- Push-уведомления с победителем 
- История гонок 
- Welcome-экран при первом запуске

Установка и запуск
git clone https://github.com/your-username/horse-racing-app.git
cd horse-racing-app
npm install
npx expo start


Чтобы каждый раз видеть welcome-экран при hot reload:
надо раскоментировать-  await AsyncStorage.removeItem('hasVisited');
в файле app/_layout.tsx 
после запуска закомментировать и тогда перейдет на страницу с гонками иначе ничего не получится


Стек который применялся
React Native/expo
TypeScript
expo-router
Animated API 
AsyncStorage
expo-notifications 
