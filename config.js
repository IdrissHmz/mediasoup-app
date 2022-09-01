/**
 * IMPORTANT (PLEASE READ THIS):
 *
 * This is not the "configuration file" of mediasoup. This is the configuration
 * file of the mediasoup-demo app. mediasoup itself is a server-side library, it
 * does not read any "configuration file". Instead it exposes an API. This demo
 * application just reads settings from this file (once copied to config.js) and
 * calls the mediasoup API with those settings when appropriate.
 */

const os = require('os');

module.exports =
{
    // Listening hostname (just for `gulp live` task).
    domain: process.env.DOMAIN || 'localhost',
    // Signaling settings (protoo WebSocket server and HTTP API server).
    https:
    {
        listenIp: '0.0.0.0',
        // NOTE: Don't change listenPort (client app assumes 4443).
        listenPort: process.env.PROTOO_LISTEN_PORT || 4443,
        // NOTE: Set your own valid certificate files.
        tls:
        {
            cert: process.env.HTTPS_CERT_FULLCHAIN || `${__dirname}/certs/fullchain.pem`,
            key: process.env.HTTPS_CERT_PRIVKEY || `${__dirname}/certs/privkey.pem`
        }
    },
    // mediasoup settings.
    mediasoup:
    {
        // Number of mediasoup workers to launch.
        numWorkers: Object.keys(os.cpus()).length,
        // mediasoup WorkerSettings.
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#WorkerSettings
        workerSettings:
        {
            logLevel: 'warn',
            logTags:
                [
                    'info',
                    'ice',
                    'dtls',
                    'rtp',
                    'srtp',
                    'rtcp',
                    'rtx',
                    'bwe',
                    'score',
                    'simulcast',
                    'svc',
                    'sctp'
                ],
            rtcMinPort: process.env.MEDIASOUP_MIN_PORT || 40000,
            rtcMaxPort: process.env.MEDIASOUP_MAX_PORT || 49999
        },
        // mediasoup Router options.
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#RouterOptions
        routerOptions:
        {
            mediaCodecs:
                [
                    {
                        kind: 'audio',
                        mimeType: 'audio/opus',
                        clockRate: 48000,
                        channels: 2
                    },
                    {
                        kind: 'video',
                        mimeType: 'video/VP8',
                        clockRate: 90000,
                        parameters:
                        {
                            'x-google-start-bitrate': 1000
                        }
                    },
                    {
                        kind: 'video',
                        mimeType: 'video/VP9',
                        clockRate: 90000,
                        parameters:
                        {
                            'profile-id': 2,
                            'x-google-start-bitrate': 1000
                        }
                    },
                    {
                        kind: 'video',
                        mimeType: 'video/h264',
                        clockRate: 90000,
                        parameters:
                        {
                            'packetization-mode': 1,
                            'profile-level-id': '4d0032',
                            'level-asymmetry-allowed': 1,
                            'x-google-start-bitrate': 1000
                        }
                    },
                    {
                        kind: 'video',
                        mimeType: 'video/h264',
                        clockRate: 90000,
                        parameters:
                        {
                            'packetization-mode': 1,
                            'profile-level-id': '42e01f',
                            'level-asymmetry-allowed': 1,
                            'x-google-start-bitrate': 1000
                        }
                    }
                ]
        },
        // mediasoup WebRtcTransport options for WebRTC endpoints (mediasoup-client,
        // libmediasoupclient).
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#WebRtcTransportOptions
        webRtcTransportOptions:
        {
            listenIps:
                [
                    {
                        ip: process.env.MEDIASOUP_LISTEN_IP || '1.2.3.4',
                        announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP
                    }
                ],
            initialAvailableOutgoingBitrate: 1000000,
            minimumAvailableOutgoingBitrate: 600000,
            maxSctpMessageSize: 262144,
            // Additional options that are not part of WebRtcTransportOptions.
            maxIncomingBitrate: 1500000
        },
        // mediasoup PlainTransport options for legacy RTP endpoints (FFmpeg,
        // GStreamer).
        // See https://mediasoup.org/documentation/v3/mediasoup/api/#PlainTransportOptions
        plainTransportOptions:
        {
            listenIp:
            {
                ip: process.env.MEDIASOUP_LISTEN_IP || '1.2.3.4',
                announcedIp: process.env.MEDIASOUP_ANNOUNCED_IP
            },
            maxSctpMessageSize: 262144
        },

        webRtcTransport: {
            listenIps: [{ ip: '0.0.0.0', announcedIp: '192.168.0.100' }], // TODO: Change announcedIp to your external IP or domain name
            enableUdp: true,
            enableTcp: true,
            preferUdp: true,
            maxIncomingBitrate: 1500000
        },
        plainRtpTransport: {
            listenIp: { ip: '0.0.0.0', announcedIp: '192.168.0.100' }, // TODO: Change announcedIp to your external IP or domain name
            rtcpMux: true,
            comedia: false
        }
    }
};
