---
title: "WireGuard vs OpenVPN vs Tailscale at High Altitude: A Performance Benchmark from Leh, Ladakh"
date: "2026-05-06"
author: "Engineering Team"
category: "Infrastructure"
image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1470&auto=format&fit=crop"
excerpt: "We ran 72 hours of controlled VPN benchmarks from our Ladakh co-working facility across three protocols. Here are the real throughput numbers, latency profiles, and our recommendation for engineers who need to access corporate networks from remote India."
---

Every remote engineer who works through a corporate VPN has the same anxiety about working from India: *will the VPN make my connection unusably slow?*

We answered this with data. Over 72 hours, we ran controlled benchmarks of the three most common VPN protocols used by software engineers connecting to US and EU corporate networks from our Leh, Ladakh facility.

## Test Environment

- **Location:** Leh, Ladakh, India (11,482 ft / 3,500m elevation)
- **Primary ISP:** BSNL Business Fiber, 300Mbps symmetric
- **VPN server endpoints tested:** AWS us-east-1 (N. Virginia), EU-West-1 (Ireland), ap-south-1 (Mumbai)
- **Test tool:** `iperf3` for throughput, `mtr` for latency/jitter, `curl` for HTTP/S real-world performance
- **Test duration:** 72 hours, samples every 10 minutes

## Baseline (No VPN)

| Endpoint | Avg Latency | Throughput (Down) | Throughput (Up) |
|---|---|---|---|
| AWS Mumbai | 42ms | 287 Mbps | 281 Mbps |
| AWS N. Virginia | 198ms | 241 Mbps | 228 Mbps |
| AWS EU Ireland | 215ms | 218 Mbps | 201 Mbps |

## WireGuard Results

WireGuard's performance at altitude was exceptional. Its minimal kernel-space overhead and use of ChaCha20 encryption (which is specifically optimized for CPUs without AES hardware acceleration) keeps throughput high.

| Endpoint | Avg Latency | Throughput | Overhead vs Baseline |
|---|---|---|---|
| AWS Mumbai | 49ms | 271 Mbps | +7ms / -5.5% |
| AWS N. Virginia | 208ms | 224 Mbps | +10ms / -7.1% |
| AWS EU Ireland | 226ms | 206 Mbps | +11ms / -8.2% |

**Verdict:** Excellent. 7–11ms overhead is imperceptible. Video calls, SSH, and real-time pair programming were all smooth.

## OpenVPN (AES-256-GCM, UDP mode) Results

OpenVPN running in UDP mode with AES-256-GCM performed well but with noticeably higher CPU utilization (relevant if your laptop's CPU throttles at altitude due to heat — see our [hardware article](/blog/altitude-hardware-failures)).

| Endpoint | Avg Latency | Throughput | Overhead vs Baseline |
|---|---|---|---|
| AWS Mumbai | 58ms | 238 Mbps | +16ms / -17% |
| AWS N. Virginia | 221ms | 196 Mbps | +23ms / -18.7% |
| AWS EU Ireland | 241ms | 185 Mbps | +26ms / -17.8% |

**Verdict:** Acceptable. The 16–26ms additional latency overhead is noticeable on high-frequency terminal interactions (e.g., tmux over SSH) but tolerable for most engineering workloads.

**Do not use OpenVPN in TCP mode.** TCP-over-TCP causes catastrophic performance degradation on any high-latency link. If your corporate VPN only supports OpenVPN TCP, request UDP access from your IT team.

## Tailscale Results

Tailscale uses WireGuard under the hood but routes traffic through its coordination servers. When endpoints can establish a direct peer-to-peer connection (without going through a DERP relay), performance matches raw WireGuard.

| Endpoint | Avg Latency | Throughput | Notes |
|---|---|---|---|
| AWS Mumbai (direct) | 51ms | 268 Mbps | Direct P2P established |
| AWS N. Virginia (direct) | 211ms | 219 Mbps | Direct P2P established |
| AWS EU Ireland (via DERP) | 254ms | 174 Mbps | DERP relay — 39ms penalty |

**Verdict:** Best developer experience. Tailscale's subnet routing and MagicDNS make corporate network access trivially simple to configure. When direct peer-to-peer works, performance is near-identical to WireGuard. Watch for DERP relay fallback on connections to distant endpoints.

## Our Recommendation by Use Case

| Use Case | Best Protocol |
|---|---|
| Individual developer, flexible setup | Tailscale |
| Corporate VPN with fixed endpoint | WireGuard (if selectable) |
| Corporate VPN OpenVPN forced | Request UDP mode |
| High-throughput data transfer (large DB dumps) | Bare fiber, no VPN — use S3 pre-signed URLs |
| Pair programming / live share | Any of the above — latency < 60ms is fine |

## What We Do Not Support

We have never had a resident unable to connect to their corporate VPN from our facility. However, a few configurations require coordination:

- **Split-tunnel VPN with DNS override:** Works, but you may need to add our Wi-Fi subnet (`192.168.10.0/24`) to your split-tunnel exclusion list
- **Always-on VPN with zero-trust NAC:** Some corporate NAC systems flag geolocation changes. Inform your IT security team in advance that you will be working from India

## The Full Infrastructure Picture

VPN performance is only one layer. For the complete picture of our network topology, power redundancy, and hardware specifications, see our full [infrastructure specs page](/infrastructure).

*Ready to stop worrying about your connection and start shipping? [Apply for the July 2026 Ladakh cohort.](/locations/ladakh)*
