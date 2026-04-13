'use client'

import * as NavigationMenu from '@radix-ui/react-navigation-menu'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

type NavigationMenuProps = ComponentPropsWithoutRef<typeof NavigationMenu.Root>

type NavigationMenuListProps = ComponentPropsWithoutRef<typeof NavigationMenu.List>

type NavigationMenuItemProps = ComponentPropsWithoutRef<typeof NavigationMenu.Item>

type NavigationMenuTriggerProps = ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>

type NavigationMenuContentProps = ComponentPropsWithoutRef<typeof NavigationMenu.Content>

type NavigationMenuSubProps = ComponentPropsWithoutRef<typeof NavigationMenu.Sub>

type NavigationMenuLinkProps = ComponentPropsWithoutRef<typeof NavigationMenu.Link>

type NavigationMenuIndicatorProps = ComponentPropsWithoutRef<typeof NavigationMenu.Indicator>

type NavigationMenuViewportProps = ComponentPropsWithoutRef<typeof NavigationMenu.Viewport>

export const NavigationMenuComponent = forwardRef<HTMLDivElement, NavigationMenuProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Root {...rest} ref={ref}>
      {children}
    </NavigationMenu.Root>
  ),
)
NavigationMenuComponent.displayName = 'NavigationMenuComponent'

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.List {...rest} ref={ref}>
      {children}
    </NavigationMenu.List>
  ),
)
NavigationMenuList.displayName = 'NavigationMenuList'

export const NavigationMenuItem = forwardRef<HTMLLIElement, NavigationMenuItemProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Item {...rest} ref={ref}>
      {children}
    </NavigationMenu.Item>
  ),
)
NavigationMenuItem.displayName = 'NavigationMenuItem'

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Trigger {...rest} ref={ref}>
      {children}
    </NavigationMenu.Trigger>
  ),
)
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Content {...rest} ref={ref}>
      {children}
    </NavigationMenu.Content>
  ),
)
NavigationMenuContent.displayName = 'NavigationMenuContent'

export const NavigationMenuSub = forwardRef<HTMLDivElement, NavigationMenuSubProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Sub {...rest} ref={ref}>
      {children}
    </NavigationMenu.Sub>
  ),
)
NavigationMenuSub.displayName = 'NavigationMenuSub'

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
  ({ children, ...rest }, ref) => (
    <NavigationMenu.Link {...rest} ref={ref}>
      {children}
    </NavigationMenu.Link>
  ),
)
NavigationMenuLink.displayName = 'NavigationMenuLink'

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
  ({ ...rest }, ref) => <NavigationMenu.Indicator {...rest} ref={ref} />,
)
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator'

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
  ({ ...rest }, ref) => <NavigationMenu.Viewport {...rest} ref={ref} />,
)
NavigationMenuViewport.displayName = 'NavigationMenuViewport'
