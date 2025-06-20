// Script para hacer login y probar la ruta de atracciones pendientes
import https from 'https';
import http from 'http';

const makeRequest = (options, data = null) => {
  return new Promise((resolve, reject) => {
    const client = options.protocol === 'https:' ? https : http;
    const req = client.request(options, (res) => {
      let responseData = '';
      res.on('data', (chunk) => {
        responseData += chunk;
      });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          data: responseData,
          headers: res.headers
        });
      });
    });
    
    req.on('error', (error) => {
      reject(error);
    });
    
    if (data) {
      req.write(data);
    }
    req.end();
  });
};

const testPendingAttractions = async () => {
  try {
    console.log('1. Intentando hacer login...');
    
    // 1. Hacer login
    const loginData = JSON.stringify({
      email: 'jcastellanosg@unicartagena.edu.co',
      password: 'tu_password_aqui' // Reemplaza con la contraseña correcta
    });
    
    const loginOptions = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/users/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': loginData.length
      }
    };
    
    const loginResponse = await makeRequest(loginOptions, loginData);
    console.log('Login response status:', loginResponse.statusCode);
    
    if (loginResponse.statusCode === 200) {
      const loginResult = JSON.parse(loginResponse.data);
      const token = loginResult.token;
      console.log('✅ Login exitoso, token obtenido');
      
      // 2. Probar ruta de atracciones pendientes
      console.log('2. Probando ruta de atracciones pendientes...');
      
      const pendingOptions = {
        hostname: 'localhost',
        port: 4000,
        path: '/api/attractions/pending',
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      
      const pendingResponse = await makeRequest(pendingOptions);
      console.log('Pending attractions response status:', pendingResponse.statusCode);
      console.log('Response data:', pendingResponse.data);
      
    } else {
      console.log('❌ Error en login:', loginResponse.data);
    }
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
};

// Ejecutar solo si se proporciona la contraseña como argumento
if (process.argv[2]) {
  const script = testPendingAttractions.toString().replace('tu_password_aqui', process.argv[2]);
  eval(script.replace('const testPendingAttractions = async () => {', '(async () => {') + ')()');
} else {
  console.log('Uso: node testLogin.js <contraseña>');
  console.log('Ejemplo: node testLogin.js micontraseña123');
}
