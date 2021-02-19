import { Global, HttpModule, Module } from '@nestjs/common';

import { ConfigService } from './services/config.service';
import { GeneratorService } from './services/generator.service';

const providers = [ConfigService, GeneratorService];

@Global()
@Module({
    providers,
    imports: [HttpModule],
    exports: [...providers, HttpModule],
})
export class SharedModule {}
