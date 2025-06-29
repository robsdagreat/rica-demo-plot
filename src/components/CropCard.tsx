export default function CropCard({ name, crop }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-gray-100 hover:border-green-300 transition">
      <h3 className="font-bold text-green-800 text-lg mb-2 text-center">{name}</h3>
      <p className="text-gray-700 text-base text-center">{crop}</p>
    </div>
  );
}
