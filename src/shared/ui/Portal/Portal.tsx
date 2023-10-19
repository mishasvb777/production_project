//создаем переиспользуемый компонент, с помощью которого сможешь указывать что и куда телепортировать

import React, { ReactNode, type FC } from 'react'
import { createPortal } from 'react-dom';

interface PortalProps {
  children?: ReactNode;  // что именно мы будем телепортировать
  element?: HTMLElement; // куда мы будем телепортировать
}

export const Portal: FC<PortalProps> = ({children, element = document.body}: PortalProps) => {
  return createPortal(children, element)
}
