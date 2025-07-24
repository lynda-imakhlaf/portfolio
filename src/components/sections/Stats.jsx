import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

function Stats() {
  const [hasAnimated, setHasAnimated] = useState(false);
  const [counts, setCounts] = useState({ models: 0, clients: 0, projects: 0 });
  const statsRef = useRef();

  const targetStats = [
    { key: 'models', number: 50, label: "Modèles Créés", icon: "📦" },
    { key: 'clients', number: 300, label: "Clients Satisfaits", icon: "👥" },
    { key: 'projects', number: 15, label: "Projets Terminés", icon: "✅" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          targetStats.forEach(stat => {
            let current = 0;
            const increment = stat.number / 50;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.number) {
                current = stat.number;
                clearInterval(timer);
              }
              setCounts(prev => ({
                ...prev,
                [stat.key]: Math.floor(current)
              }));
            }, 40);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated, targetStats]);

  return (
    <section className="stats" ref={statsRef}>
      <div className="container">
        <div className="stats-grid">
          {targetStats.map((stat, index) => (
            <motion.div 
              key={stat.key}
              className="stat-item"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={hasAnimated ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="stat-icon">{stat.icon}</div>
              <span className="stat-number">
                {counts[stat.key]}+
              </span>
              <span className="stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;