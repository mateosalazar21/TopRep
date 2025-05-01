import { View, Text, Image, Modal, Pressable, TouchableOpacity } from 'react-native';
import { HelpCircle, X } from 'lucide-react-native';
import { useState } from 'react';

interface InfoButtonPictureProps {
    image: any; // la imagen importada
}

export default function InfoButtonPicture({ image }: InfoButtonPictureProps) {
    const [visible, setVisible] = useState(false);

    return (
        <>
            <Pressable onPress={() => setVisible(true)} className="ml-2">
                <HelpCircle size={20} color="white" />
            </Pressable>

            <Modal visible={visible} animationType="fade" transparent>
                <View className="flex-1 bg-black/90 justify-center items-center px-6">
                    <View className="w-full max-w-md bg-neutral-900 rounded-2xl p-4">
                        <View className="flex-row justify-between items-center mb-3">
                            <TouchableOpacity onPress={() => setVisible(false)}>
                                <X size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Image source={image} className="w-full h-80 rounded-xl mb-4" resizeMode="cover" />
                    </View>
                </View>
            </Modal>
        </>
    );
}
