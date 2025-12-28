import React, { useState, useEffect } from 'react';
import { Settings, ArrowUpDown, Info, Fuel, ChevronDown, X, Search } from 'lucide-react';

import eth from '../assets/img/tokens/eth.png';
import usdc from '../assets/img/tokens/usdc.png';
import usdt from '../assets/img/tokens/usdt.png';
import wbtc from '../assets/img/tokens/wrapped-btc.png';
import weth from '../assets/img/tokens/wrapped-eth.png';
import mfi from '../assets/img/tokens/mfi.png';

const SwapCard = ({ t }) => {

    const tokensList = [
        { symbol: 'ETH', name: 'Ethereum', img: eth, balance: '2.5', price: 2450.50 },
        { symbol: 'USDC', name: 'USD Coin', img: usdc, balance: '4500', price: 1.00 },
        { symbol: 'USDT', name: 'Tether', img: usdt, balance: '3,500.25', price: 1.00 },
        { symbol: 'WBTC', name: 'Wrapped Bitcoin', img: wbtc, balance: '0.05', price: 98500.00 },
        { symbol: 'WETH', name: 'Wrapped Ethereum', img: weth, balance: '2.1', price: 2450.50 },
        { symbol: 'MFI', name: 'Mriya Finance', img: mfi, balance: '10,000', price: 0.05 }
    ];

    // STATES
    const [payToken, setPayToken] = useState(tokensList[0]);
    const [receiveToken, setReceiveToken] = useState(tokensList[1]);

    const [payAmount, setPayAmount] = useState('1.5');
    const [receiveAmount, setReceiveAmount] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('pay');

    const exchangeRate = payToken.price / receiveToken.price;

    useEffect(() => {
        if (payAmount) {
            const val = parseFloat(payAmount);
            if (!isNaN(val)) {
                const calculated = (val * exchangeRate).toFixed(6);
                setReceiveAmount(parseFloat(calculated).toString());
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [payToken, receiveToken]);

    // FUNCTIONS

    // 1. Pay Input
    const handlePayInput = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setPayAmount(value);

            if (value && !isNaN(value)) {
                const result = (parseFloat(value) * exchangeRate).toFixed(6);
                setReceiveAmount(parseFloat(result).toString());
            } else {
                setReceiveAmount('');
            }
        }
    }

    // 2. Receive Input
    const handleReceiveInput = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setReceiveAmount(value);

            if (value && !isNaN(value)) {
                const result = (parseFloat(value) / exchangeRate).toFixed(6);
                setPayAmount(parseFloat(result).toString());
            } else {
                setPayAmount('');
            }
        }
    }

    // 3.Swap Tokens
    const handleSwapArrows = () => {
        const temp = payToken;
        setPayToken(receiveToken);
        setReceiveToken(temp);
    };

    // 4. Open Tokens List
    const openTokenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    // 5. Select Token
    const selectToken = (token) => {
        if (modalType === 'pay') {
            if (token.symbol === receiveToken.symbol) {
                setReceiveToken(payToken);
            }
            setPayToken(token);
        } else {
            if (token.symbol === payToken.symbol) {
                setPayToken(receiveToken);
            }
            setReceiveToken(token);
        }
        setIsModalOpen(false);
    };

    return(
        <div className="w-full max-w-[580px] p-4 relative animate-fade-in">

            <div className="backdrop-blur-2xl bg-[#131823]/80 border border-white/10 rounded-[3rem] shadow-2xl p-6 sm:p-8">

                {/* HEADER */}
                <div className="flex justify-between items-center mb-8 px-2">
                    <h2 className="text-2xl font-semibold text-white tracking-wide">{t.title}</h2>
                    <button className="text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-500 p-2 rounded-full hover:bg-white/5">
                        <Settings size={24} />
                    </button>
                </div>

                {/* PAY BLOCK */}
                <div className="relative group z-10">
                    <div className="bg-[#0a0e17]/60 rounded-[2rem] p-6 border border-transparent group-hover:border-[#00d4ff]/30 transition-all duration-300 shadow-none group-hover:shadow-[0_0_40px_rgba(0,212,255,0.08)]">
                    
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-400 text-base font-medium">{t.pay}</span>
                            <span className="text-xs text-[#00d4ff] bg-[#00d4ff]/10 px-3 py-1 rounded-lg cursor-pointer hover:bg-[#00d4ff]/20 transition">Max</span>
                        </div>

                        <div className="flex justify-between items-center mb-2">

                            <button 
                                onClick={() => openTokenModal('pay')}
                                className="flex items-center gap-3 bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full transition-all border border-transparent hover:border-white/10 shrink-0"
                            >
                                <img src={payToken.img} alt={payToken.symbol} className="w-8 h-8 rounded-full shadow-lg object-contain" />
                                <span className="text-2xl font-bold text-white">{payToken.symbol}</span>
                                <ChevronDown size={20} className="text-gray-400"/>
                            </button>

                            <input
                                type="text"
                                value={payAmount}
                                onChange={handlePayInput}
                                placeholder='0'
                                className="bg-transparent text-right text-5xl font-bold text-white outline-none w-full placeholder-gray-600 font-sans"
                            />
                        </div>

                        <div className="flex justify-end text-xs text-gray-400 font-mono tracking-tight mt-2">
                            {t.balance}: {payToken.balance}
                        </div>
                    </div>
                </div>

                {/* SWITCH BUTTON */}
                <div className="relative h-4 z-20">
                    <div className="absolute left-1/2 -translate-x-1/2 -top-6">
                        <button 
                            onClick={handleSwapArrows}
                            className="bg-[#1a2c38] p-3 rounded-2xl border-[6px] border-[#131823] hover:scale-110 hover:border-[#131823] transition-transform duration-200 cursor-pointer group shadow-xl hover:rotate-180"
                        >
                            <ArrowUpDown size={22} className="text-[#00d4ff] group-hover:text-white transition-colors" />
                        </button>
                    </div>
                </div>

                {/* RECEIVE BLOCK */}
                <div className="relative group z-0">
                    <div className="bg-[#0a0e17]/60 rounded-[2rem] p-6 border border-transparent group-hover:border-[#f0dfae]/30 transition-all duration-300 shadow-none group-hover:shadow-[0_0_40px_rgba(240,233,174,0.08)] pt-8">
                        <div className="flex justify-between mb-4">
                            <span className="text-gray-400 text-base font-medium">{t.receive}<span className="text-xs opacity-50">({t.estimated})</span></span>
                        </div>

                        <div className="flex justify-between items-center mb-2">
                            <button 
                                onClick={() => openTokenModal('receive')}
                                className="flex items-center gap-3 bg-black/30 hover:bg-black/50 px-4 py-2 rounded-full transition-all border border-transparent hover:border-white/10 shrink-0"
                                >
                                <img src={receiveToken.img} alt={receiveToken.symbol} className="w-8 h-8 rounded-full shadow-lg object-contain" />
                                <span className="text-2xl font-bold text-white">{receiveToken.symbol}</span>
                                <ChevronDown size={20} className="text-gray-400"/>
                            </button>

                            <input 
                                type="text" 
                                value={receiveAmount}
                                onChange={handleReceiveInput}
                                placeholder='0'
                                className="bg-transparent text-right text-5xl font-bold text-[#f0dfae] outline-none w-full placeholder-gray-600"
                                />
                        </div>

                        <div className="flex justify-end text-xs text-green-400/90 font-mono mt-2">
                            ($0.12 {t.cheaper})
                        </div>
                    </div>
                </div>

                {/* INFO */}
                <div className="mt-6 bg-[#0a0e17]/30 rounded-2xl p-5 border border-white/5 space-y-4">
                    <div className="flex justify-between text-sm font-medium text-gray-400">
                        <span className="flex items-center gap-2 cursor-help hover:text-white transition-colors"><Info size={16}/> {t.rate}</span>
                        <span className="font-mono text-gray-200 text-base">
                            1 {payToken.symbol} = {exchangeRate.toFixed(4)} {receiveToken.symbol}
                        </span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-gray-400">
                        <span className="flex items-center gap-2 cursor-help hover:text-white transition-colors"><Fuel size={16}/> {t.gas}</span>
                        <span className="font-mono text-[#f0dfae] flex items-center gap-2 text-base">
                            $4.50 <span className="bg-green-500/10 text-green-400 px-2 py-0.5 rounded text-xs font-bold">FAST</span>
                        </span>
                    </div>
                </div>

                {/* MAIN BUTTON */}
                <button className="w-full mt-6 py-5 rounded-2xl bg-gradient-to-r from-[#ffeebb] via-[#f0dfae] to-[#d4c085] text-[#0a0e17] font-bold text-lg tracking-wide hover:shadow-[0_0_35px_rgba(240,223,174,0.3)] hover:scale-[1.01] transition-all active:scale-[0.98] active:opacity-90">
                    {t.button}
                </button>
            </div>

            {/* TOKEN SELECT MODAL WINDOW*/}
            {isModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">

                    {/* BG*/}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-[3rem]"
                        onClick={() => setIsModalOpen(false)}
                    />

                    {/* MODAL WINDOW*/}
                    <div className="relative w-full h-full bg-[#131823] rounded-[2.5rem] p-6 flex flex-col animate-fade-in border border-white/10 shadow-2xl">
                        
                        {/* TITLE*/}
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Select Token</h3>
                            <button 
                                onClick={() => setIsModalOpen(false)}
                                className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-full"
                            >
                                <X size={24} />    
                            </button>
                        </div>

                        {/* SEARCH*/}
                        <div className="relative mb-4">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                            <input 
                                type="text" 
                                placeholder='Search name or address'
                                className="w-full bg-[#0a0e17] border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#00d4ff]/50"
                            />
                        </div>

                        {/* TOKENS LIST*/}
                        <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                            {tokensList.map((token) => (
                                <div
                                    key={token.symbol}
                                    onClick={() => selectToken(token)}
                                    className={`
                                        flex items-center justify-between p-3 rounded-xl cursor-pointer transition-all
                                        ${(modalType === 'pay' ? payToken.symbol : receiveToken.symbol) === token.symbol
                                            ? 'bg-[#00d4ff]/10 border border-[#00d4ff]/30'
                                            : 'hover:bg-white/5 border border-transparent'
                                        }    
                                    `}
                                >
                                    <div className="flex items-center gap-3">
                                        <img src={token.img} alt={token.symbol} className="w-9 h-9 rounded-full" />
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold">{token.symbol}</span>
                                            <span className="text-gray-500 text-xs">{token.name}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-white font-mono text-sm">{token.balance}</div>
                                        <div className="text-gray-500 text-xs">${token.price}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SwapCard;