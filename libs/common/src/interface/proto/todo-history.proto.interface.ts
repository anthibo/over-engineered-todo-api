import { Observable } from 'rxjs';
import { MessageResponseDto } from '../dto/message-response.dto';
import { CreateTodoHistoryDto } from '../dto';

export const TODO_HISTORY_PROTO_SERVICE = 'TodoHistoryService';
export const TODO_HISTORY_PROTO_PACKAGE = 'todo_history';

export interface TodoHistoryGrpcService {
  createTodoHistory(data: CreateTodoHistoryDto): Observable<MessageResponseDto>;
}
