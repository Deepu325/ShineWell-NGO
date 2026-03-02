import { motion } from 'framer-motion';

const PageHero = ({
  badge,
  title,
  titleAccent,
  description,
  image,
  children
}) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 bg-primary overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={image}
          alt=""
          className="w-full h-full object-cover opacity-20 scale-105 animate-slow-zoom"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-primary/50 to-primary" />
      </div>

      <div className="container-custom relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          {badge && (
            <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-accent/30">
              {badge}
            </span>
          )}
          <h1 className="text-5xl md:text-7xl font-heading font-bold mb-8 leading-tight">
            {title} {titleAccent && <span className="text-accent underline decoration-4 underline-offset-8">{titleAccent}</span>}
          </h1>
          {description && (
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
