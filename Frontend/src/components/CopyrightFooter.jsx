/*
 * Copyright Footer Component
 * SIAT Tourism Platform
 * Copyright (c) 2025 Jose Luis Castellanos Guardia, Ronald Roman Valdes y Evaristo Feria Perez
 */

import React from 'react';

export default function CopyrightFooter() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200/50 py-3 mt-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-xs text-gray-500 mb-1">
            © 2025 SIAT Cartagena. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            Desarrollado por Jose Luis Castellanos, Ronald Roman y Evaristo Feria
          </p>
        </div>
      </div>
    </footer>
  );
}
