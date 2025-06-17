import { db } from "@/db";
import {agents} from "@/db/schema";
import {createTRPCRouter,baseProcedure, protectedProcedure} from "@/trpc/init";
import{agentsInsertSchema} from "../schema"
import z from "zod";
import { eq } from "drizzle-orm";
// import { TRPCError } from "@trpc/server";


export const agentsRouter = createTRPCRouter({
    // TODO: change 'getOne' to use 'protectedProcedure'
    getOne:protectedProcedure.input(z.object({id:z.string()})).query(async ({input})=>{
        const [existingAgent]=await db
        .select()
        .from(agents)
        .where(eq(agents.id,input.id ));
        
        return existingAgent;
    }),
    // TODO: change 'getMany' to use 'protectedProcedure'
    getMany:protectedProcedure.query(async ()=>{
        const data=await db
        .select()
        .from(agents);
        
        return data;
    }),
    create:protectedProcedure.input(agentsInsertSchema).mutation(async ({input,ctx})=>{
        const [createAgent]=await db
        .insert(agents)
        .values({
           ...input,
           userId:ctx.auth.user.id,
        })
        .returning();

        return createAgent;
        
    }),
}) 