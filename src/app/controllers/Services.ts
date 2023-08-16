import { httpStatusCode } from "../../Errors";
import { servicesRepository } from "app/repository/Services";
import { Request, Response } from "express";

export class ServicesController {
  async List(req: Request, res: Response) {
      try {
        const Query = await servicesRepository.find({
          select: {
            id: true,
            name: true,
            description: true,
            duration: true,
            price: true,
            professional: {
              name: true,
              availabilitily: true,
            },
          },
          take: 5,
        });
        const List = Query.map((prop) => ({
          id: prop.id,
          name: prop.name,
          description: prop.description,
          duration: prop.duration,
          price: prop.price,
          professional: prop.professional.name,
          availability: prop.professional.availabilitily,
        }));

        res.status(httpStatusCode.OK).send(List)
        
    } catch (error) {
        res.status(httpStatusCode.BAD_REQUEST).send(`Erro interno`)
    }
  }
}
