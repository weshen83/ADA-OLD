import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Note: In production, use the official Stripe SDK
// import Stripe from 'stripe';
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing signature' },
            { status: 400 }
        );
    }

    // TODO: Verify webhook signature with Stripe SDK
    // try {
    //     const event = stripe.webhooks.constructEvent(
    //         body,
    //         signature,
    //         process.env.STRIPE_WEBHOOK_SECRET!
    //     );
    // } catch (err) {
    //     return NextResponse.json(
    //         { error: 'Webhook signature verification failed' },
    //         { status: 400 }
    //     );
    // }

    try {
        const event = JSON.parse(body);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object;

                console.log('✅ Payment successful:', {
                    sessionId: session.id,
                    customerEmail: session.customer_email,
                    metadata: session.metadata,
                });

                // TODO: Trigger n8n workflow for fulfillment
                // 1. Generate PDF compliance certificate
                // 2. Generate timestamped audit log
                // 3. Send transactional email via Resend
                // 4. Update Attio CRM stage to "Shield_Active"

                break;
            }

            case 'checkout.session.expired': {
                const session = event.data.object;
                console.log('⚠️ Checkout expired:', session.id);

                // TODO: Trigger abandoned cart email sequence
                break;
            }

            case 'customer.subscription.updated': {
                // Handle subscription changes (Phase 2)
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true });

    } catch (error) {
        console.error('Stripe webhook error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}
