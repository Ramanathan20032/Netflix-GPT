const SocialButton = ({ platform, id }) => {
    // Platform configurations
    const platformConfigs = {
        imdb: {
            href: `https://www.imdb.com/name/${id}`,
            className: "bg-gradient-to-r from-[#F5C518] to-[#E6B800] hover:brightness-90 text-black font-bold",
            label: "IMDB"
        },
        facebook: {
            href: `https://www.facebook.com/${id}`,
            className: "bg-gradient-to-r from-[#1877F2] to-[#0E5AAD] hover:brightness-90 text-white",
            label: "Facebook"
        },
        instagram: {
            href: `https://www.instagram.com/${id}`,
            className: "bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] hover:brightness-90 text-white",
            label: "Instagram"
        },
        twitter: {
            href: `https://www.twitter.com/${id}`,
            className: "bg-gradient-to-r from-[#1DA1F2] to-[#0D8BD9] hover:brightness-90 text-white",
            label: "Twitter"
        }
    };

    const config = platformConfigs[platform];

    if (!config || !id) return null;

    return (
        <a
            href={config.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`px-3 py-1 rounded-lg text-md transition-colors ${config.className}`}
        >
            {config.label}
        </a>
    );
};

export default SocialButton;
