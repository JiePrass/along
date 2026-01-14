import { Search, SlidersHorizontal } from "lucide-react";

const SearchFilter = () => {
    return (
        <div className="flex items-center gap-2 w-full md:w-auto">
            {/* Input Search */}
            <div className="relative grow md:w-lg h-12">
                <input
                    type="text"
                    placeholder="Cari Tempat Wisata Yang Ingin Anda Kunjungi"
                    className="w-full h-full pl-4 pr-4 bg-gray-100/50 border border-stone-300 text-stone-600 placeholder:text-stone-400 text-sm focus:outline-none focus:border-stone-500 transition-colors"
                />
            </div>

            <button className="h-12 w-12 flex items-center justify-center bg-stone-800 text-white hover:bg-stone-700 transition-colors">
                <SlidersHorizontal size={18} />
            </button>

            <button className="h-12 w-12 flex items-center justify-center bg-stone-800 text-white hover:bg-stone-700 transition-colors">
                <Search size={18} />
            </button>
        </div>
    );
};

export default SearchFilter;