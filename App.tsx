import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Star, 
  ChevronDown, 
  Menu, 
  X,
  Wallet,
  Percent,
  Clock,
  Car
} from 'lucide-react';
import { COMPANY_NAME, PHONE_NUMBER, FEATURES, FLEET, REVIEWS, FAQ, ADDRESS, HERO_TITLE, HERO_SUBTITLE } from './constants';
import ChatWidget from './components/ChatWidget';
import { CarModel, Feature, Review, FaqItem } from './types';

// --- Sub-components for better organization within single file context if preferred, 
// but splitting them makes sense for larger apps. Keeping it consolidated here for flow.

const SectionTitle: React.FC<{ title: string; subtitle?: string; centered?: boolean }> = ({ title, subtitle, centered = true }) => (
  <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
    {subtitle && <div className="w-20 h-1 bg-yellow-400 mx-auto rounded-full"></div>}
  </div>
);

const FeatureCard: React.FC<{ feature: Feature }> = ({ feature }) => {
  const icons: Record<string, React.ReactNode> = {
    "Wallet": <Wallet size={32} className="text-yellow-600" />,
    "Percent": <Percent size={32} className="text-yellow-600" />,
    "Clock": <Clock size={32} className="text-yellow-600" />,
    "Car": <Car size={32} className="text-yellow-600" />
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
      <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-6">
        {icons[feature.iconName]}
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
    </div>
  );
};

const CarCard: React.FC<{ car: CarModel }> = ({ car }) => (
  <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
    <div className="relative overflow-hidden h-56">
      <img 
        src={car.image} 
        alt={car.name} 
        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
      />
      <div className="absolute top-4 right-4 bg-yellow-400 text-slate-900 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
        {car.category}
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-slate-900 mb-2">{car.name}</h3>
      <p className="text-yellow-600 font-bold text-lg mb-4">{car.price}</p>
      <ul className="space-y-2 mb-6">
        {car.features.map((feat, idx) => (
          <li key={idx} className="flex items-center text-slate-600 text-sm">
            <CheckCircle2 size={16} className="text-green-500 mr-2" />
            {feat}
          </li>
        ))}
      </ul>
      <button className="w-full bg-slate-900 text-white py-3 rounded-xl font-medium hover:bg-slate-800 transition-colors">
        Арендовать
      </button>
    </div>
  </div>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
    <div className="flex items-center mb-4">
      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4 object-cover" />
      <div>
        <h4 className="font-bold text-slate-900">{review.name}</h4>
        <p className="text-slate-500 text-xs">{review.role}</p>
      </div>
      <div className="ml-auto flex text-yellow-400">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={16} fill={i < review.rating ? "currentColor" : "none"} className={i < review.rating ? "text-yellow-400" : "text-slate-300"} />
        ))}
      </div>
    </div>
    <p className="text-slate-700 italic">"{review.content}"</p>
  </div>
);

const FaqAccordion: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => (
  <div className="border-b border-slate-200 last:border-0">
    <button 
      className="w-full py-6 flex justify-between items-center text-left focus:outline-none"
      onClick={onClick}
    >
      <span className="text-lg font-medium text-slate-900">{item.question}</span>
      <ChevronDown 
        className={`transform transition-transform duration-300 text-slate-400 ${isOpen ? 'rotate-180' : ''}`} 
      />
    </button>
    <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
      <p className="text-slate-600 leading-relaxed pr-8">{item.answer}</p>
    </div>
  </div>
);

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed w-full z-40 bg-white/90 backdrop-blur-md border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-yellow-400 p-2 rounded-lg">
                <Car className="text-slate-900" size={24} />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">{COMPANY_NAME}</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollToSection('features')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Преимущества</button>
              <button onClick={() => scrollToSection('fleet')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Автопарк</button>
              <button onClick={() => scrollToSection('reviews')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Отзывы</button>
              <button onClick={() => scrollToSection('contacts')} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Контакты</button>
            </div>

            {/* Call Action */}
            <div className="hidden md:flex items-center gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Ежедневно 9:00 - 21:00</p>
                <p className="font-bold text-slate-900">{PHONE_NUMBER}</p>
              </div>
              <button onClick={() => scrollToSection('form')} className="bg-slate-900 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">
                Заказать звонок
              </button>
            </div>

            {/* Mobile Toggle */}
            <button className="md:hidden text-slate-900" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 absolute w-full left-0 top-20 shadow-xl p-4 flex flex-col gap-4">
            <button onClick={() => scrollToSection('features')} className="text-lg font-medium text-slate-900 py-2">Преимущества</button>
            <button onClick={() => scrollToSection('fleet')} className="text-lg font-medium text-slate-900 py-2">Автопарк</button>
            <button onClick={() => scrollToSection('reviews')} className="text-lg font-medium text-slate-900 py-2">Отзывы</button>
            <button onClick={() => scrollToSection('contacts')} className="text-lg font-medium text-slate-900 py-2">Контакты</button>
            <hr className="border-slate-100 my-2" />
            <div className="flex flex-col gap-2">
              <span className="text-slate-500 text-sm">Есть вопросы? Звоните:</span>
              <a href={`tel:${PHONE_NUMBER}`} className="text-xl font-bold text-slate-900">{PHONE_NUMBER}</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Decorative */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-yellow-50 rounded-bl-[100px] -z-10 hidden lg:block"></div>
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-bold mb-6">
                🚕 Работа в такси
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-tight mb-6">
                {HERO_TITLE}
              </h1>
              <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
                {HERO_SUBTITLE}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => scrollToSection('form')}
                  className="bg-yellow-400 text-slate-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/30 text-center"
                >
                  Стать водителем
                </button>
                <button 
                  onClick={() => scrollToSection('fleet')}
                  className="bg-white border-2 border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold text-lg hover:border-slate-900 hover:text-slate-900 transition-all text-center"
                >
                  Выбрать авто
                </button>
              </div>
              
              <div className="mt-12 flex items-center gap-6 text-slate-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>Моментальные выплаты</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-500" />
                  <span>Без залога</span>
                </div>
              </div>
            </div>
            
            <div className="lg:w-1/2 relative">
               {/* Abstract decorative image using placeholder */}
               <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                 <img 
                   src="https://picsum.photos/800/600?random=99" 
                   alt="Happy taxi driver" 
                   className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                 />
               </div>
               {/* Floating Badge */}
               <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs hidden sm:block">
                 <div className="flex items-center gap-4 mb-2">
                   <div className="bg-yellow-100 p-2 rounded-full">
                     <Wallet className="text-yellow-600" size={24} />
                   </div>
                   <div>
                     <p className="text-xs text-slate-500">Средний доход</p>
                     <p className="font-bold text-slate-900 text-lg">7 500 ₽ / смена</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Почему водители выбирают нас" subtitle="line" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(feature => (
              <FeatureCard key={feature.id} feature={feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Fleet Section */}
      <section id="fleet" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Наш автопарк" subtitle="line" />
          <p className="text-center text-slate-600 max-w-2xl mx-auto mb-12 -mt-8">
            Все автомобили имеют лицензию такси, брендирование и полностью готовы к работе.
            Техническое обслуживание и замена резины — за наш счет.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {FLEET.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <SectionTitle title="Отзывы водителей" subtitle="line" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {REVIEWS.map(review => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <SectionTitle title="Частые вопросы" subtitle="line" />
          <div className="bg-white rounded-2xl">
            {FAQ.map((item, index) => (
              <FaqAccordion 
                key={index} 
                item={item} 
                isOpen={openFaqIndex === index}
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact & Form Section */}
      <section id="contacts" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-[150px] opacity-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-4xl font-bold mb-6">Готовы начать зарабатывать?</h2>
              <p className="text-slate-400 mb-10 text-lg">
                Оставьте заявку, и наш менеджер перезвонит вам в течение 15 минут, чтобы обсудить детали и назначить встречу.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <Phone className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Телефон для связи</p>
                    <p className="text-xl font-bold">{PHONE_NUMBER}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-slate-800 p-3 rounded-lg">
                    <MapPin className="text-yellow-400" size={24} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-sm mb-1">Офис таксопарка</p>
                    <p className="text-xl font-bold">{ADDRESS}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div id="form" className="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Заявка на подключение</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ваше имя</label>
                  <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all" placeholder="Иван Иванов" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Телефон</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all" placeholder="+7 (___) ___-__-__" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Стаж вождения</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none transition-all bg-white">
                    <option>Менее 3 лет</option>
                    <option>3-5 лет</option>
                    <option>Более 5 лет</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-yellow-400 text-slate-900 font-bold py-4 rounded-xl hover:bg-yellow-500 transition-colors shadow-lg shadow-yellow-400/20 mt-2">
                  Отправить заявку
                </button>
                <p className="text-xs text-slate-400 text-center mt-4">
                  Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных.
                </p>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Car className="text-yellow-400" size={20} />
              <span className="text-white font-bold text-lg">{COMPANY_NAME}</span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Договор оферты</a>
            </div>
            <p className="text-xs">© {new Date().getFullYear()} Все права защищены.</p>
          </div>
        </div>
      </footer>

      {/* Gemini Chat Widget */}
      <ChatWidget />
    </div>
  );
}

export default App;