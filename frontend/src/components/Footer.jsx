export default function Footer() {
    return (
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">PokieBid</h3>
              <p className="text-indigo-200">The ultimate Pokémon card marketplace for collectors and enthusiasts.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="/auctions" className="text-indigo-200 hover:text-white transition-colors duration-200">Auctions</a></li>
                <li><a href="/sell" className="text-indigo-200 hover:text-white transition-colors duration-200">Sell</a></li>
                <li><a href="/about" className="text-indigo-200 hover:text-white transition-colors duration-200">About Us</a></li>
                <li><a href="/contact" className="text-indigo-200 hover:text-white transition-colors duration-200">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/terms" className="text-indigo-200 hover:text-white transition-colors duration-200">Terms of Service</a></li>
                <li><a href="/privacy" className="text-indigo-200 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Facebook</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Twitter</a></li>
                <li><a href="#" className="text-indigo-200 hover:text-white transition-colors duration-200">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-indigo-800 text-center text-indigo-200">
            <p>&copy; {new Date().getFullYear()} PokieBid. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  