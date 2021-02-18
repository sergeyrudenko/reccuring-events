import { Controller } from '@nestjs/common';

@Controller('math')
export class MathController {
    sum(data: number[]): number {
        return (data || []).reduce((a, b) => a + b);
    }
}
