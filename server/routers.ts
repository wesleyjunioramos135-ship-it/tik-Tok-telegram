import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import {
  getBridgeLinkBySlug,
  getAllBridgeLinks,
  createBridgeLink,
  updateBridgeLink,
  deleteBridgeLink,
  toggleBridgeLinkStatus,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  bridgeLinks: router({
    getBySlug: publicProcedure
      .input(z.object({ slug: z.string() }))
      .query(async ({ input }) => {
        const link = await getBridgeLinkBySlug(input.slug);
        if (!link || !link.isActive) {
          throw new TRPCError({
            code: "NOT_FOUND",
            message: "Bridge link not found or inactive",
          });
        }
        return link;
      }),

    getAll: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user?.role !== "admin") {
        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Only admins can view all links",
        });
      }
      return await getAllBridgeLinks();
    }),

    create: protectedProcedure
      .input(
        z.object({
          slug: z.string().min(1).max(128),
          title: z.string().min(1).max(255),
          description: z.string().optional(),
          telegramUrl: z.string().url(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can create links",
          });
        }
        await createBridgeLink({
          slug: input.slug,
          title: input.title,
          description: input.description || null,
          telegramUrl: input.telegramUrl,
          isActive: 1,
        });
        return { success: true };
      }),

    update: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          slug: z.string().min(1).max(128).optional(),
          title: z.string().min(1).max(255).optional(),
          description: z.string().optional(),
          telegramUrl: z.string().url().optional(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can update links",
          });
        }
        const { id, ...data } = input;
        await updateBridgeLink(id, data);
        return { success: true };
      }),

    delete: protectedProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can delete links",
          });
        }
        await deleteBridgeLink(input.id);
        return { success: true };
      }),

    toggleStatus: protectedProcedure
      .input(z.object({ id: z.number(), isActive: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user?.role !== "admin") {
          throw new TRPCError({
            code: "FORBIDDEN",
            message: "Only admins can toggle link status",
          });
        }
        await toggleBridgeLinkStatus(input.id, input.isActive);
        return { success: true };
      }),
  }),
});

export type AppRouter = typeof appRouter;
