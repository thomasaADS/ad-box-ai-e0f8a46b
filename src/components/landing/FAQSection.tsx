import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return { ref, isVisible };
}

const faqData = [
  {
    q: 'מה ההבדל בין AdSync לכלים אחרים?',
    a: 'AdSync הוא הכלי היחיד שמשלב יצירת קריאייטיב, מחקר קהלים, אופטימיזציה ודוחות - הכל במקום אחד, עם AI שמותאם ספציפית לשוק הישראלי. בעוד שכלים אחרים מתמקדים בתחום אחד, AdSync מספק פתרון מקצה לקצה.',
  },
  {
    q: 'איך AdSync מנהל את תקציב הפרסום?',
    a: 'AdSync משתמש באלגוריתמי AI מתקדמים שמנתחים את ביצועי הקמפיינים בזמן אמת ומחלקים את התקציב בצורה אופטימלית בין המודעות והקהלים השונים. המערכת מזהה אוטומטית מה עובד ומעבירה תקציב למודעות המצליחות ביותר.',
  },
  {
    q: 'האם אפשר לבטל בכל עת?',
    a: 'כמובן. אין התחייבות כלל. ביטול בלחיצת כפתור, בלי שאלות ובלי עמלות. אם תבטל תוך תקופת הניסיון, לא תחויב כלל.',
  },
  {
    q: 'האם צריך ידע טכני?',
    a: 'בכלל לא. AdSync נבנה כדי שכל אחד יוכל ליצור קמפיינים מקצועיים. פשוט תזין את הקישור לאתר שלך, והמערכת עושה את כל השאר - מהקופי ועד העיצוב.',
  },
  {
    q: 'איך מתחילים?',
    a: 'ממש פשוט: נרשמים חינם, מזינים את כתובת האתר שלכם, ותוך דקות מקבלים קמפיין מוכן לפרסום. 7 ימי ניסיון חינם, ללא כרטיס אשראי.',
  },
];

export function FAQSection() {
  const reveal = useScrollReveal();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section
      ref={reveal.ref}
      id="faq"
      className={`py-20 sm:py-28 px-4 bg-gradient-to-b from-gray-50/80 to-white section-reveal ${
        reveal.isVisible ? 'is-visible' : ''
      }`}
    >
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-5 text-gray-900">
            שאלות{' '}
            <span className="bg-gradient-to-l from-purple-600 to-violet-500 bg-clip-text text-transparent">
              נפוצות
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto">
            כל מה שצריך לדעת לפני שמתחילים
          </p>
        </div>

        <div className="space-y-3">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className={`rounded-xl border transition-all duration-300 bg-white ${
                openFaq === index
                  ? 'border-purple-200 shadow-lg shadow-purple-100/50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-right"
              >
                <span className="font-bold text-[15px] sm:text-base text-gray-800 pr-2">
                  {faq.q}
                </span>
                <div
                  className={`w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    openFaq === index ? 'rotate-180' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-purple-600" />
                </div>
              </button>
              <div
                className={`accordion-content ${
                  openFaq === index ? 'is-open' : ''
                }`}
              >
                <div>
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <p className="text-gray-500 text-sm sm:text-[15px] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
