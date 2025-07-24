 
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Clock } from 'lucide-react';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactDetails = [
    {
      icon: MapPin,
      title: 'Localisation',
      primary: 'Disponible internationalement',
      secondary: 'Travail à distance'
    },
    {
      icon: Mail,
      title: 'Email',
      primary: 'contact@imakteck3d.com',
      secondary: 'Professionnel uniquement'
    },
    {
      icon: Clock,
      title: 'Délai de réponse',
      primary: 'Sous 24h en moyenne',
      secondary: 'Lun-Ven: 9h-18h'
    }
  ];

  const socialLinks = [
    {
      name: 'Sketchfab',
      url: 'https://sketchfab.com/ayb3d',
      icon: '🎨'
    },
    {
      name: 'CGTrader',
      url: '#',
      icon: '💼'
    },
    {
      name: 'ArtStation',
      url: '#',
      icon: '🎨'
    }
  ];

  const benefits = [
    '✅ Délais respectés',
    '✅ Révisions incluses',
    '✅ Formats multiples',
    '✅ Support technique'
  ];

  const subjectOptions = [
    { value: '', label: 'Sélectionnez un sujet' },
    { value: 'commission', label: 'Commande personnalisée' },
    { value: 'licensing', label: 'Licence d\'utilisation' },
    { value: 'support', label: 'Support technique' },
    { value: 'collaboration', label: 'Collaboration' },
    { value: 'other', label: 'Autre' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Contactez-moi
        </motion.h2>
        
        <div className="contact-content">
          {/* Informations de contact */}
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3>📧 Informations de Contact</h3>
            
            <div className="contact-details">
              {contactDetails.map((detail, index) => (
                <div key={index} className="contact-item">
                  <detail.icon className="icon" size={20} />
                  <div>
                    <strong>{detail.title}</strong><br />
                    {detail.primary}<br />
                    <span className="text-muted">{detail.secondary}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <h3>🌐 Mes Plateformes</h3>
            <div className="social-links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link"
                >
                  {link.icon} {link.name}
                </a>
              ))}
            </div>

            <div className="contact-cta">
              <h4>💡 Besoin d'un modèle personnalisé ?</h4>
              <p>Je crée des modèles 3D sur mesure selon vos spécifications exactes.</p>
              <ul>
                {benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Formulaire */}
          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="form-header">
              <h3>📝 Envoyez-moi un message</h3>
              <p>Décrivez votre projet et je vous répondrai rapidement</p>
            </div>

            {submitStatus === 'success' && (
              <div className="alert alert-success">
                ✅ Message envoyé avec succès ! Je vous répondrai bientôt.
              </div>
            )}
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Nom *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Votre nom complet"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="votre@email.com"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="subject">Sujet</label>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
              >
                {subjectOptions.map((option, index) => (
                  <option key={index} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Décrivez votre projet en détail..."
              />
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>🔄 Envoi en cours...</>
              ) : (
                <>📨 Envoyer le message</>
              )}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

export default Contact;