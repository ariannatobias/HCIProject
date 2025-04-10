import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);

// Function to create a group
const createGroup = async (name, description) => {
    const response = await fetch('http://127.0.0.1:8000/groups/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
  
    if (!response.ok) {
      console.error('Failed to create group');
      return;
    }
  
    const group = await response.json();
    console.log('Group created:', group);
  };
