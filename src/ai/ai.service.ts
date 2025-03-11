import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CreateAiDto } from './dto/create-ai.dto';

@Injectable()
export class AiService {
  // private readonly aiServiceUrl = 'http://localhost:5001/summarize';

  async create(createAiDto: CreateAiDto) {
    // try {
    //   const response = await axios.post(
    //     this.aiServiceUrl,
    //     {
    //       text: createAiDto.text,
    //     },
    //     {
    //       headers: {
    //         Authorization: `${process.env.SECRET_TOKEN_IA_SERVICES}`,
    //       },
    //     },
    //   );

    //   return response.data.summary;
    // } catch (error) {
    //   return `Error: ${error.response?.data?.error || error.message}`;
    // }
  }
}
