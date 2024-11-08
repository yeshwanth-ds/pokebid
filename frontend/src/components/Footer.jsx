export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-8">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-3">PokieBid</h3>
            <p className="text-indigo-300 text-sm">
              Pokémon card marketplace for collectors and enthusiasts.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/auction" className="text-indigo-200 hover:text-white transition-colors duration-200">Auctions</a></li>
              <li><a href="/sell" className="text-indigo-200 hover:text-white transition-colors duration-200">Sell</a></li>
              <li><a href="/contact" className="text-indigo-200 hover:text-white transition-colors duration-200">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-3">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Facebook</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Twitter</a></li>
              <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Instagram</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-4 border-t border-indigo-800 text-center text-indigo-300 text-xs">
          <p>&copy; {new Date().getFullYear()} PokieBid. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
