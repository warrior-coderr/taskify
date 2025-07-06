export default function Profile() {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Profile</h2>
            <p className="mt-4 text-gray-600">User settings coming soon…</p>
        </div>
    );
}

// import backIcon from "../assets/backwhite.png";
// import lightIcon from "../assets/lightmodeicon.png";
// import darkIcon from "../assets/whitedark.png";


{/* <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex items-center space-x-4 rounded-xl bg-gray-800/50 p-3 shadow-lg backdrop-blur-md md:top-4 md:bottom-auto">
                <button
                    id="back-btn"
                    onClick={() => navigate(-1)}
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                >
                    <img src={backIcon} alt="Back" className="h-5 w-5" />
                </button>
                {['Home', 'My Tasks', 'Completed', 'Logout'].map((l, i) => (
                    <button
                        key={i}
                        onClick={() => navigate(l === 'Home' ? '/' : `/${l.toLowerCase().replace(' ', '')}`)}
                        className="rounded-lg px-3 py-1 text-sm hover:bg-white/10 transition"
                    >
                        {l}
                    </button>
                ))}
                <button
                    onClick={toggleTheme}
                    className="rounded-full bg-white/10 p-2 hover:bg-white/20 transition"
                >
                    <img src={isDark ? darkIcon : lightIcon} alt="Toggle theme" className="h-5 w-5" />
                </button>
            </nav> */}