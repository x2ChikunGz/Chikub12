cd "$(dirname "$0")"
D=$(grep -oP 'const DUR=\K[0-9.]+' proj/assets/timing.js)
sed -e "s/77.92/$D/g" -e 's|<script src="assets/voice.js"></script>|<script src="assets/timing.js"></script><script src="assets/mirror.js"></script><script src="assets/room.js"></script><script src="assets/style.js"></script><script src="assets/shots.js"></script><script src="assets/post.js"></script>|' ../scroll/proj/index.html > proj/index.html
sed -e "s/77.92/$D/g" -e 's|<script src="proj/assets/voice.js"></script>|<script src="proj/assets/timing.js"></script><script src="proj/assets/mirror.js"></script><script src="proj/assets/room.js"></script><script src="proj/assets/style.js"></script><script src="assets/style.js"></script><script src="proj/assets/shots.js"></script><script src="proj/assets/post.js"></script>|' ../scroll/cap.html > cap.html
grep -c "post.js" proj/index.html cap.html
