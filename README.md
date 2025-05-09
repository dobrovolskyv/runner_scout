# Лошадинные скачки (Expo React Native)

Пиксельная аркада со скачками для 5 лошадей.  
Соревнуйтесь, запускайте гонки и получайте пуш-уведомление о победителе!

 Функции

- Анимированные скачки лошадей
- Push-уведомления с победителем 
- История гонок 
- Welcome-экран при первом запуске

Установка и запуск <br/>
git clone https://github.com/your-username/horse-racing-app.git <br/>
cd horse-racing-app <br/>
npm install <br/>
npx expo start <br/>


Чтобы каждый раз видеть welcome-экран при hot reload:
надо раскоментировать-  await AsyncStorage.removeItem('hasVisited');
в файле app/_layout.tsx 
после запуска закомментировать и тогда перейдет на страницу с гонками иначе ничего не получится


Стек который применялся <br/>
React Native/expo <br/>
TypeScript <br/>
expo-router <br/>
Animated API <br/>
AsyncStorage <br/>
expo-notifications <br/>
