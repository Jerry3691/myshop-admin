import { Pipe, PipeTransform } from "@angular/core";

@Pipe({ name: "messageChatTime" })

export class MessageChatTimePipe implements PipeTransform {
    transform(time: string, nextTime: string) {
        return new Date(time).getDate() === new Date(nextTime).getDate()
    }
}
