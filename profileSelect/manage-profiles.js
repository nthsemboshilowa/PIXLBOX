// Profile data storage
const STORAGE_KEY = 'pixlbox_profiles';

// Get profiles from localStorage
function getProfiles() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
}

// Save profiles to localStorage
function saveProfiles(profiles) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
}

// Generate random avatar
function generateAvatar() {
    const randomSeed = Math.random().toString(36).substring(7);
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${randomSeed}`;
}

// Render editable profiles
function renderEditableProfiles() {
    const profiles = getProfiles();
    const grid = document.getElementById('profilesGrid');
    
    grid.innerHTML = profiles.map((profile, index) => `
        <div class="edit-profile-card" data-id="${profile.id}">
            <div class="edit-avatar-wrapper">
                <img 
                    src="${profile.avatar}" 
                    alt="${profile.name}"
                    class="edit-avatar"
                    id="avatar-${profile.id}"
                >
            </div>
            <input 
                type="text" 
                class="edit-profile-name" 
                value="${profile.name}"
                id="name-${profile.id}"
                maxlength="20"
            >
            <button 
                class="change-avatar-button" 
                onclick="changeAvatar(${profile.id})"
            >
                Change Avatar
            </button>
        </div>
    `).join('');
}

// Change avatar for a specific profile
function changeAvatar(profileId) {
    const newAvatar = generateAvatar();
    const avatarImg = document.getElementById(`avatar-${profileId}`);
    avatarImg.src = newAvatar;
}

// Save all changes
function saveChanges() {
    const profiles = getProfiles();
    
    profiles.forEach(profile => {
        const nameInput = document.getElementById(`name-${profile.id}`);
        const avatarImg = document.getElementById(`avatar-${profile.id}`);
        
        if (nameInput && avatarImg) {
            profile.name = nameInput.value.trim() || profile.name;
            profile.avatar = avatarImg.src;
        }
    });
    
    saveProfiles(profiles);
    window.location.href = 'index.html';
}

// Back button
document.getElementById('backButton').addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Save button
document.getElementById('saveButton').addEventListener('click', saveChanges);

// Initialize
renderEditableProfiles();
