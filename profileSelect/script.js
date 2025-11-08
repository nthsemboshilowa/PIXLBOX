// Profile data storage
const STORAGE_KEY = 'pixlbox_profiles';

// Default profiles
const defaultProfiles = [
    {
        id: 1,
        name: 'Alex',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'
    },
    {
        id: 2,
        name: 'Jordan',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan'
    },
    {
        id: 3,
        name: 'Sam',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sam'
    },
    {
        id: 4,
        name: 'Taylor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Taylor'
    }
];

// Get profiles from localStorage or use defaults
function getProfiles() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        return JSON.parse(stored);
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProfiles));
    return defaultProfiles;
}

// Save profile selection
function selectProfile(profileId) {
    localStorage.setItem('current_profile', profileId);
    window.location.href = '../home/index.html';
}

// Render profiles
function renderProfiles() {
    const profiles = getProfiles();
    const grid = document.getElementById('profilesGrid');
    
    grid.innerHTML = profiles.map(profile => `
        <button class="profile-card" onclick="selectProfile(${profile.id})">
            <div class="profile-avatar-wrapper">
                <img 
                    src="${profile.avatar}" 
                    alt="${profile.name}"
                    class="profile-avatar"
                >
            </div>
            <span class="profile-name">${profile.name}</span>
        </button>
    `).join('');
}

// Manage profiles button
document.getElementById('manageButton').addEventListener('click', () => {
    window.location.href = 'manage-profiles.html';
});

// Initialize
renderProfiles();