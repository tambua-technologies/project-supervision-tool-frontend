import { response, rest } from 'msw';

export const handlers = [
    rest.post(`/focal_people/login`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({data: { message: "login was successful"}})
        )
    })
  ]