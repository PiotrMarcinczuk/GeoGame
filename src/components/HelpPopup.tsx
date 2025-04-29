export default function HelpPopup() {
  return (
    <div>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>
      <div className="absolute top-1/2 left-1/2 w-1/2 h-1/2 bg-white rounded-lg shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-20">
        <h2 className="text-center text-xl font-bold mt-4">Pomoc</h2>
        <p className="text-center mt-4">Tutaj znajdziesz pomocne informacje.</p>
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          X
        </button>
      </div>
    </div>
  );
}
