import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ContactFormData } from "../api/types";
import { createMessage } from "../api/ContactApi";
import "./ContactPage.css"; // Import du fichier CSS

const ContactPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ContactFormData>();
  
  const [submitStatus, setSubmitStatus] = useState<{
    success?: string;
    error?: string;
  }>({});

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await createMessage(data);
      setSubmitStatus({ success: response.message });
      reset();
    } catch (error) {
      setSubmitStatus({
        error: error instanceof Error ? error.message : "Erreur inconnue"
      });
    }
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contactez-nous</h1>

      {/* Messages de statut */}
      {submitStatus.success && (
        <div className="status-message status-success">
          {submitStatus.success}
        </div>
      )}
      
      {submitStatus.error && (
        <div className="status-message status-error">
          {submitStatus.error}
        </div>
      )}

      {/* Formulaire de contact */}
      <form onSubmit={handleSubmit(onSubmit)} className="contact-form">
        <div className="form-group">
          <label htmlFor="name" className="form-label">
            Nom complet *
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Ce champ est obligatoire" })}
            className="form-input"
          />
          {errors.name && (
            <p className="form-error">{errors.name.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email *
          </label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "Ce champ est obligatoire",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Adresse email invalide"
              }
            })}
            className="form-input"
          />
          {errors.email && (
            <p className="form-error">{errors.email.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="form-label">
            Sujet *
          </label>
          <input
            id="subject"
            type="text"
            {...register("subject", { required: "Ce champ est obligatoire" })}
            className="form-input"
          />
          {errors.subject && (
            <p className="form-error">{errors.subject.message}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="message" className="form-label">
            Message *
          </label>
          <textarea
            id="message"
            rows={5}
            {...register("message", {
              required: "Ce champ est obligatoire",
              minLength: {
                value: 10,
                message: "Le message doit contenir au moins 10 caractères"
              }
            })}
            className="form-input form-textarea"
          />
          {errors.message && (
            <p className="form-error">{errors.message.message}</p>
          )}
        </div>

        <button type="submit" className="submit-button">
          Envoyer le message
        </button>
      </form>

      {/* Autres méthodes de contact */}
      <div className="contact-methods">
        <h2 className="methods-title">Autres moyens de contact</h2>
        <div className="methods-grid">
          <div className="method-card">
            <h3 className="method-title">Email</h3>
            <p className="method-text">contact@votreecommerce.com</p>
          </div>
          <div className="method-card">
            <h3 className="method-title">Téléphone</h3>
            <p className="method-text">+33 1 23 45 67 89</p>
          </div>
          <div className="method-card">
            <h3 className="method-title">Adresse</h3>
            <p className="method-text">123 Rue du Commerce, 75000 Paris</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;