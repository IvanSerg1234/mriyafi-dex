import React from 'react';
import { ArrowLeft, Sparkles, TrendingUp } from 'lucide-react';

const PoolDetail = ({ pool, onBack, t }) => {
    const transactions = [
        { time: '1 min ago', price: '$125.2M', amount: '$672.20', type: 'buy'},
        { time: '5 min ago', price: '125.4M', amount: '$12.35', type: 'sell'},
        { time: '12 min ago', price: '$0.9M', amount: '$40.00', type: 'buy'}
    ];

    return (
        <div className="w-full max-w-5xl animate-fade-in relative z-10 p-4">

            {/* BACK TO POOLS BUTTON*/}
            <button 
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 bg-[#131823]/50 px-5 py-2.5 rounded-full border border-white/5 hover:border-white/20 text-lg font-medium"
            >
                <ArrowLeft size={18} />
                <span>{t.back}</span>
            </button>

            {/* POOL TITLE*/}
            <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                <div className="flex items-center gap-5">
                    <div className="flex -space-x-4">
                        <img src={pool.imgs[0]} alt="" className="w-16 h-16 rounded-full border-4 border-[#050b14] z-10 shadow-lg" />
                        <img src={pool.imgs[1]} alt="" className="w-16 h-16 rounded-full border-4 border-[#050b14] shadow-lg" />
                    </div>
                    <div className="flex items-baseline gap-3">
                        <h2 className="text-4xl md:text-5xl font-bold text-white">{pool.pair}</h2>
                        <span className="text-gray-500 font-bold text-2xl">{pool.version}</span>
                    </div>
                </div>
                
                <div className={`px-4 py-1.5 rounded-full border ${pool.isHot ? 'bg-[#f0dfae]/10 border-[#f0dfae]/30 text-[#f0dfae]' : 'bg-[#00d4ff]/10 border-[#00d4ff]/30 text-[#00d4ff]'}`}>
                    Active Pool
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                
                {/* LEFT SIDE: STATISTICS AND GRAPHIC */}
                <div className={`
                    lg:col-span-2 rounded-[3rem] p-8 border relative overflow-hidden backdrop-blur-xl bg-[#131823]/80 flex flex-col justify-between
                    ${pool.isHot ? 'border-[#f0dfae]/30' : 'border-[#00d4ff]/30'}
                `}>
                    {/* STATISTIC BOX */}
                    <div className="bg-[#0a0e17]/40 rounded-3xl p-6 border border-white/5 mb-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                                <div className="text-gray-400 text-sm mb-2">{t.tvl}</div>
                                <div className="text-white text-2xl font-bold">{pool.tvl}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 text-sm mb-2">{t.vol}</div>
                                <div className="text-white text-2xl font-bold">{pool.vol}</div>
                            </div>
                            <div>
                                <div className="text-gray-400 text-sm mb-2">{t.fees}</div>
                                <div className="text-white text-2xl font-bold">$375K</div>
                            </div>
                            <div className="text-right md:text-left">
                                <div className="text-gray-400 text-sm mb-2">{t.apr}</div>
                                <div className={`text-2xl font-bold flex items-center gap-2 ${pool.isHot ? 'text-[#f0dfae]' : 'text-[#00d4ff]'}`}>
                                    {pool.apr} <Sparkles size={18} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* GRAPHIC */}
                    <div className="h-64 w-full relative mt-auto">
                        <svg viewBox="0 0 500 150" className="w-full h-full" preserveAspectRatio="none">
                            <defs>
                                <linearGradient id="chartGradientBig" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={pool.isHot ? '#f0dfae' : '#00d4ff'} stopOpacity="0.4" />
                                    <stop offset="100%" stopColor={pool.isHot ? '#f0dfae' : '#00d4ff'} stopOpacity="0" />
                                </linearGradient>
                            </defs>
                            <path 
                                d="M0 100 C 50 120, 100 60, 150 80 S 250 40, 300 60 S 400 20, 450 40 S 480 30, 500 35" 
                                fill="none" 
                                stroke={pool.isHot ? '#f0dfae' : '#00d4ff'} 
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <path 
                                d="M0 100 C 50 120, 100 60, 150 80 S 250 40, 300 60 S 400 20, 450 40 S 480 30, 500 35 L 500 150 L 0 150 Z" 
                                fill="url(#chartGradientBig)" 
                                stroke="none"
                            />
                        </svg>
                    </div>
                </div>

                {/* RIGHT SIDE: POSITION */}
                <div className="lg:col-span-1 rounded-[3rem] p-8 border border-white/10 bg-[#131823]/60 backdrop-blur-xl flex flex-col h-full">
                    <h3 className="text-2xl font-bold text-white mb-8">{t.position}</h3>
                    
                    <div className="space-y-6 mb-8 flex-grow">
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                            <span className="text-gray-400">{t.liquidity}</span>
                            <span className="text-white font-mono text-xl">$0.00</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                            <span className="text-gray-400">{t.feesEarned}</span>
                            <span className="text-white font-mono text-xl">$0.00</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-auto">
                        {/* ADD BUTTON */}
                        <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#ffeebb] via-[#f0dfae] to-[#d4c085] text-[#0a0e17] font-bold text-lg shadow-lg hover:shadow-[0_0_25px_rgba(240,223,174,0.3)] hover:scale-[1.02] transition-all">
                            {t.add}
                        </button>
                        {/* REMOVE BUTTON */}
                        <button className="w-full py-4 rounded-2xl bg-[#1a2c38]/50 border border-[#00d4ff]/30 text-white font-bold text-lg hover:bg-[#00d4ff]/10 hover:border-[#00d4ff] transition-all">
                            {t.remove}
                        </button>
                    </div>
                </div>
            </div>

            {/* 3 BLOCK: TRANSACTIONS */}
            <div className="rounded-[3rem] p-8 border border-white/10 bg-[#131823]/60 backdrop-blur-xl mb-12">
                <h3 className="text-2xl font-bold text-white mb-6">{t.transactions}</h3>
                
                <table className="w-full text-base">
                    <thead>
                        <tr className="text-gray-500 border-b border-white/5 text-lg">
                            <th className="pb-4 text-left font-normal pl-4">{t.colDate}</th>
                            <th className="pb-4 text-right font-normal">{t.colPrice}</th>
                            <th className="pb-4 text-right font-normal pr-4">{t.colLiq}</th>
                        </tr>
                    </thead>
                    <tbody className="font-mono">
                        {transactions.map((tx, i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors text-lg">
                                <td className="py-4 pl-4 text-gray-400">{tx.time}</td>
                                <td className="py-4 text-right text-white">{tx.price}</td>
                                <td className={`py-4 pr-4 text-right ${tx.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                                    {tx.amount}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PoolDetail;