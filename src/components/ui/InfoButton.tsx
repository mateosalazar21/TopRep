import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { HelpCircle } from 'lucide-react-native';

interface InfoButtonProps {
  description: string;
}

const InfoButton = ({ description }: InfoButtonProps) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Botón con ícono "?" */}
      <TouchableOpacity onPress={() => setVisible(true)} activeOpacity={0.7}>
        <HelpCircle size={20} color="white" />
      </TouchableOpacity>

      {/* Modal con descripción */}
      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.6)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <View
            style={{
              backgroundColor: '#1f1f1f',
              padding: 20,
              borderRadius: 12,
              maxWidth: '80%',
            }}
          >
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
              {description}
            </Text>
            <TouchableOpacity
              onPress={() => setVisible(false)}
              style={{
                marginTop: 15,
                paddingVertical: 8,
                paddingHorizontal: 16,
                backgroundColor: '#ff6600',
                borderRadius: 8,
                alignSelf: 'center',
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Entendido</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

export default InfoButton;
// Este componente es un botón que muestra un modal con una descripción al ser presionado.