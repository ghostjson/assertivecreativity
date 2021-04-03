import { MenuItem } from 'primeng/api';

export interface MenuItemClickEvent {
  originalEvent: Event;
  item: MenuItem;
}
