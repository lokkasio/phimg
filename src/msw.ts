import {
  ResponseResolver,
  RestRequest,
  RestContext,
  DefaultBodyType,
} from "msw";
import { searchParamsToSvgString } from "./lib";

export const mswResolver: ResponseResolver<
  RestRequest,
  RestContext,
  DefaultBodyType
> = (req, res, ctx) =>
  res(
    ctx.status(200),
    ctx.set("Content-Type", "image/svg+xml"),
    ctx.body(searchParamsToSvgString(req.url.searchParams))
  );
