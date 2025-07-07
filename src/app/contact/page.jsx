import React from 'react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl md:text-4xl font-bold text-[#F9A303ff] mb-6">Contact Us</h1>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* معلومات التواصل */}
        <div className="space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800">
        Contact Info
        </h2>
        <p className="text-gray-600">يسعدنا التواصل معك في أي وقت. فريقنا متاح دائمًا للرد على استفساراتك.</p>

        <div className="text-gray-700 space-y-2">
            <p><span className="font-semibold">📍address:</span> 20 امتداد ولي العهد - حدائق القبه - امام سور المخابرات - بجوار برايڤيت چيم, Cairo, Egypt</p>
            <p><span className="font-semibold">📞Phone:</span> 011 03673110</p>
            <p><span className="font-semibold">✉️Email:</span> elmister.cafe.restauran@gmail.com</p>
        </div>

        <div className="w-full h-64 rounded-lg overflow-hidden shadow-lg">
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3451.906688811252!2d31.292190959228112!3d30.096858616188644!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fdc2174230f%3A0x43fe91736b95f532!2zMTkgRW10ZWRhZCBXYWxpIEFsIEFoZCwg2KfZhNiy2YrYqtmI2YYg2KfZhNmC2KjZhNmK2KnYjCDYp9mE2KPZhdmK2LHZitip2Iwg2YXYrdin2YHYuNipINin2YTZgtin2YfYsdip4oCsIDQ1MTEwMDM!5e0!3m2!1sar!2seg!4v1751813922266!5m2!1sar!2seg"
  width="100%"
  height="100%"
  style={{ border: 0 }}
  allowFullScreen=""
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
          </div>
        </div>

        {/* فورم التواصل */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
          Send a Message
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A303ff]"
            />
            <input
              type="email"
              placeholder="Your Email account"
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#F9A303ff]"
            />
            <textarea
              placeholder="Write Message Here"
              rows={5}
              className="w-full border border-gray-300 rounded px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-[#F9A303ff]"
            ></textarea>
            <button
              type="submit"
              className="bg-[#F9A303ff] text-white px-5 py-2 rounded hover:bg-[#e49100] transition"
            >
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
