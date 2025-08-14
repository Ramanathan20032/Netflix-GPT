const LoadingSpinner = () => {
    return (
        <div className=" min-h-screen flex items-center justify-center p-8">
            {/* Netflix-style Loading Spinner */}
            <div className="rounded-2xl p-8">
                <div className="flex justify-center relative">
                    <div className="w-16 h-16 relative">
                        {/* Outer orbit - Red Netflix color */}
                        <div className="absolute w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full top-0 left-1/2 transform -translate-x-1/2 animate-spin shadow-2xl shadow-red-500/50"
                            style={{
                                transformOrigin: '50% 32px',
                                animation: 'spin 2s linear infinite'
                            }}>
                            <div className="absolute inset-0 bg-red-400 rounded-full animate-pulse opacity-75"></div>
                        </div>

                        {/* Middle orbit - White */}
                        <div className="absolute w-3 h-3 bg-white rounded-full top-2 left-1/2 transform -translate-x-1/2 animate-spin shadow-lg shadow-white/30"
                            style={{
                                transformOrigin: '50% 24px',
                                animation: 'spin 1.5s linear infinite reverse'
                            }}>
                            <div className="absolute inset-0 bg-gray-100 rounded-full animate-pulse opacity-50"></div>
                        </div>

                        {/* Inner orbit - Dark red */}
                        <div className="absolute w-2 h-2 bg-red-700 rounded-full top-3 left-1/2 transform -translate-x-1/2 animate-spin shadow-md shadow-red-700/40"
                            style={{
                                transformOrigin: '50% 16px',
                                animation: 'spin 1s linear infinite'
                            }}>
                        </div>

                        {/* Center core - Netflix red with glow */}
                        <div className="absolute w-3 h-3 bg-gradient-to-br from-red-600 to-red-800 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-2xl shadow-red-500/60">
                            <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20"></div>
                            <div className="absolute inset-0.5 bg-red-400 rounded-full animate-pulse"></div>
                        </div>

                        {/* Glowing ring effect */}
                        <div className="absolute inset-0 rounded-full border-2 border-red-500/20 animate-pulse"></div>
                        <div className="absolute inset-2 rounded-full border border-red-400/10 animate-spin" style={{ animation: 'spin 4s linear infinite reverse' }}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoadingSpinner;