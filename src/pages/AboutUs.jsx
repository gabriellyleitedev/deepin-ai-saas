import React from 'react';
import { motion } from 'framer-motion';

const AboutUs = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
          <p className="mt-4 text-gray-600">Learn more about our mission and values.</p>
        </motion.div>        
      </div>

    </section>
  )
}

  export default AboutUs;