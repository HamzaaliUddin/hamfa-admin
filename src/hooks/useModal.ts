'use client';

import { useState } from 'react';

type ModalState = {
  [key: string]: boolean;
};

/**
 * Hook for managing multiple modal states
 */
export const useModal = () => {
  const [modals, setModals] = useState<ModalState>({});

  const openModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };

  const toggleModal = (modalName: string) => {
    setModals((prev) => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  const isOpen = (modalName: string): boolean => {
    return !!modals[modalName];
  };

  return {
    modals,
    openModal,
    closeModal,
    toggleModal,
    isOpen
  };
};

export default useModal;

