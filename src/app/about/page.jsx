export const metadata = {
  title: "About Us | Authentic European Dining in Hadayek El Qubba",
  description:
    "With over 30 years of experience in Italy and the UK, our restaurant in Hadayek El Qubba offers world-class food crafted with love and tradition.",
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Our Story</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A legacy of flavor born in Europe, now served in the heart of Cairo.
        </p>
      </section>

      <section className="space-y-6 text-gray-700 text-lg leading-relaxed">
        <p>
          Welcome to our restaurant — a place where tradition, flavor, and
          international experience come together to create a truly memorable
          dining experience.
        </p>

        <p>
          Located in **Hadayek El Qubba**, our kitchen is led by chefs with
          more than <strong>30 years of hands-on experience</strong> in some of
          the finest restaurants across **Italy and the United Kingdom**.
        </p>

        <p>
          Our journey began with a love for authentic European cuisine — from
          rustic Italian pasta and wood-fired pizzas to refined British roasts
          and comforting desserts. We bring this passion home to Cairo, offering
          our community a taste of Europe, made with heart and heritage.
        </p>

        <p>
          Everything we serve is crafted with care: from fresh ingredients and
          traditional techniques to modern presentation and warm hospitality.
        </p>

        <p>
          Whether you're dining with family, celebrating with friends, or just
          treating yourself — you're always welcome here.
        </p>

        <p className="font-semibold text-gray-800">
          Experience real food. Experience real passion.
        </p>
      </section>
    </main>
  );
}
