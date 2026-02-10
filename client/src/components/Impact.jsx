import React from 'react';

const Impact = () => {
    return (
        <section className="py-20 bg-deep-emerald text-white">
            <div className="max-w-screen-xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-6">
                        <h3 className="text-5xl font-bold mb-2">24/7</h3>
                        <p className="text-emerald-100 text-lg">Accessible Support</p>
                    </div>
                    <div className="p-6 border-l border-emerald-600 border-r-0 md:border-r">
                        <h3 className="text-5xl font-bold mb-2">10+</h3>
                        <p className="text-emerald-100 text-lg">Languages Supported</p>
                    </div>
                    <div className="p-6">
                        <h3 className="text-5xl font-bold mb-2">100%</h3>
                        <p className="text-emerald-100 text-lg">Verified Medical Info</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Impact;
