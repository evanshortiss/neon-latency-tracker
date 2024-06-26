import { NextRequest, NextResponse } from 'next/server'
import { log } from '@/lib/log'

export default async function secureCron(
  req: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  // https://vercel.com/docs/cron-jobs/manage-cron-jobs#securing-cron-jobs
  const authHeader = req.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    log.error('cron invocation terminated due to missing or incorrect authorization header')

    return NextResponse.json(
      {
        message: 'Unauthorized',
      },
      {
        status: 401,
      }
    )
  } else {
    try {
      log.info(`invoking cron handler for ${req.url}`)
      const res = await handler()
      log.info(`cron handler for ${req.url} complete`)
      return res
    } catch (e) {
      log.error(`error executing cron endpoint ${req.url}:`)
      log.error(e)
      return NextResponse.json(
        {
          message: 'Internal server error',
        },
        {
          status: 500,
        }
      )
    }
  }
}
