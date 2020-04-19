import { notification } from "antd";

export class Notify {
  public static show(message: string, description: string) {
    notification.open({ message, description });
  }
}
