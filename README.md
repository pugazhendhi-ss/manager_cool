# Wedding Gift Web Application 🎁

A beautiful, mobile-first web application to present a special wedding gift to Vignesh Sarumathy. Features elegant animations, password protection, and an interactive scratch card reveal.

## ✨ Features

- 🎨 Elegant design with beautiful animations
- 💛 Animated heart symbol between names
- 📱 Mobile-first responsive design
- 🔐 Password-protected access with SHA-256 hashing
- 🎁 Interactive scratch card reveal
- ✨ Golden hearts falling animation (replaces confetti)
- 📋 One-click gift code copy
- 🖼️ Dynamic background transitions

## 📁 Project Structure

```
manager_cool/
├── index.html              # Main HTML structure
├── styles.css              # All styling and animations
├── script.js               # Interactive functionality
├── generate_hashes.py      # Password hashing utility
├── assets/
│   └── vignesh-photo.png   # Manager's photo (you need to add this)
└── README.md              # This file
```

## 🚀 Setup Instructions

### Step 1: Add the Photo

1. Make sure you have Vignesh's photo
2. Place it in the `assets` folder as `vignesh-photo.png`
   - Or update the path in `styles.css` line 45 if using a different name

### Step 2: Generate Secure Hashes

Run the Python script to generate password and gift code hashes:

```bash
python generate_hashes.py
```

The script will prompt you for:
- **Access password**: What you want your manager to enter (e.g., "VigneshSarumathy")
- **Gift card code**: The actual Amazon Pay gift card code

Example output:
```javascript
const APPPWD = "9f5506a40f5d328f27cf4f75a25f596cd7e3d683d60448fca33c79123a96925d";
const APAYGC = "dGVzdF9naWZ0LWNvZGU=";
```

### Step 3: Update JavaScript Configuration

1. Open `script.js`
2. Find lines 4-5 with the placeholders:
   ```javascript
   const APPPWD = "9f5506a40f5d328f27cf4f75a25f596cd7e3d683d60448fca33c79123a96925d";
   const APAYGC = "dGVzdF9naWZ0LWNvZGU=";
   ```
3. Replace these with the output from `generate_hashes.py`

### Step 4: Test Locally

Simply open `index.html` in your browser to test the application locally.

## 🌐 Deployment Options

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   cd D:\pyprojects\manager_cool
   vercel
   ```

3. Follow the prompts - Vercel will automatically detect it as a static site

### Deploy to Netlify

**Option 1: Drag & Drop**
- Simply drag the entire folder to [Netlify Drop](https://app.netlify.com/drop)

**Option 2: CLI**
```bash
npm install -g netlify-cli
netlify deploy
```

### Deploy to GitHub Pages

1. Create a new GitHub repository
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Wedding gift web app"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

3. Go to repository Settings → Pages
4. Select `main` branch as source
5. Save and your site will be live at `https://yourusername.github.io/your-repo/`

## 🎨 Design Features

### First Page (Password Screen)
- Elegant black background
- Beautiful cursive heading: "Happy Married Life Vignesh ❤ Sarumathy"
- Animated heartbeat effect on the heart symbol
- Smooth fade-in animations for all elements
- Clean, minimal design
- Gold-bordered password input
- Shake animation on incorrect password

### Second Page (Gift Reveal)
- Vignesh's photo smoothly fades in as background
- Text positioned at the top to avoid covering the face
- "Your Gift" in elegant gold cursive
- Interactive scratch card with gradient overlay
- Golden hearts falling animation (not confetti!)
- Gift code display with copy functionality

## 🛠️ Technologies Used

- **HTML5**: Semantic structure
- **CSS3**: Custom properties, animations, flexbox
- **JavaScript (ES6)**: Modern vanilla JS, no frameworks
- **CryptoJS**: SHA-256 password hashing
- **Canvas API**: Scratch card effect
- **Google Fonts**: Allura, Great Vibes, Poppins

## 📱 Browser Support

Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile, Samsung Internet)

## 🔒 Security Notes

- Password is hashed using SHA-256 with custom salt
- Gift code is base64 encoded (obfuscation, not encryption)
- All validation happens client-side
- No server or database required

## 🎨 Customization Guide

**Change Colors:**
Edit CSS variables in `styles.css` (lines 3-10):
```css
:root {
    --gold-color: #d4af37;  /* Change gold color */
    --dark-bg: #0a0a0a;     /* Change background */
}
```

**Change Fonts:**
Modify the Google Fonts import in `styles.css` (line 1)

**Change Gift Amount:**
Edit `index.html` line 38:
```html
<p class="gift-card-value">₹1000</p>
```

**Adjust Animations:**
Modify keyframes in `styles.css` or animation parameters in `script.js`

## 📝 How It Works

1. **Password Protection**: User enters password → hashed with SHA-256 + salt → compared to stored hash
2. **Background Transition**: Black background → smooth fade to photo on correct password
3. **Scratch Card**: HTML5 Canvas with touch/mouse support → reveals Amazon Pay card
4. **Golden Hearts**: 60 hearts fall over 6 seconds when gift is revealed
5. **Copy Code**: Uses modern Clipboard API with fallback for older browsers

## 🐛 Troubleshooting

**Issue**: Page shows but no background image
- Check that photo path matches in `styles.css` line 45
- Verify photo is in `assets/` folder

**Issue**: Password not working
- Ensure you ran `generate_hashes.py` and updated `script.js`
- Check browser console for errors
- Try clearing browser cache

**Issue**: Scratch card not working on mobile
- Ensure you're using a modern mobile browser
- Check that touch events are not being blocked

**Issue**: Copy button doesn't work
- Some browsers require HTTPS for clipboard access
- Fallback mechanism should work on all browsers

---

Made with ❤ for Vignesh Sarumathy's special day!

**Questions?** Open an issue or check the code comments for detailed explanations.
