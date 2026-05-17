---
title: "Maintaining 99.9% Network Uptime at 11,500 Feet: Our Full Operational Playbook"
date: "2026-05-18"
author: "Engineering Team"
category: "Infrastructure"
image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1470&auto=format&fit=crop"
excerpt: "A public operational document covering every failure mode, our mitigation strategy, and our real-world uptime track record. Built so engineers can make an informed decision before booking."
---

This document is our operational playbook. We publish it openly because the engineers we host make their decision to join based on infrastructure, not marketing.

**Claimed uptime: 99.9% network availability during retreat months (July–August).**
**Measured uptime (July–August 2025): 99.61%** — 26 minutes of total downtime across 31 days, all during two planned ISP maintenance windows announced 24 hours in advance.

Here is exactly how we achieve this.

## Defining "Uptime"

We define network uptime as: **any resident device connected to our network can reach at least one of (8.8.8.8, 1.1.1.1) within 4 seconds.**

This is deliberately strict. A brief ISP switchover that self-resolves within 4 seconds does not count as downtime. An extended outage where internet is unreachable for more than 4 seconds does count.

We measure this with a custom `bash` ping monitor running on a Raspberry Pi 4 connected independently to the LAN, writing results to a local InfluxDB instance and dashboarding in Grafana.

## The Five Failure Categories and Our Mitigation

### 1. ISP Fiber Cut

**Probability:** ~2 events per month (June–August), typically resolved in 2–6 hours.

**Mitigation:** Automatic WAN failover to secondary ISP via pfSense load balancer. Failover trigger: 3 consecutive failed pings to 8.8.8.8 with 500ms intervals. Switchover time: < 4 seconds.

**Resident experience:** Possible 1–4 second reconnection lag. SSH connections on resilient clients (Mosh, iTerm2 with reconnect) survive. Standard SSH may require reconnect.

### 2. Grid Power Outage

**Probability:** 4–8 planned hours per month, occasional unplanned events.

**Mitigation:** Full compound on 10kVA double-conversion UPS (zero-millisecond transition). Generator auto-starts after 8 hours, powers compound indefinitely at current fuel reserve.

**Resident experience:** Zero. Double-conversion UPS means power is always coming from battery — the grid powers the charger, not the equipment directly. Grid drops are invisible.

### 3. ISP-Side Network Degradation (not full outage)

**Probability:** 3–5 events per month. Packet loss > 5%, latency spikes > 200ms.

**Mitigation:** pfSense configured with gateway quality monitoring. If packet loss exceeds 10% or latency exceeds 300ms on the primary WAN, traffic routes to secondary ISP even without a full outage.

**Resident experience:** Possible brief period of higher latency before automatic rerouting. Usually invisible if working in a session-based tool.

### 4. On-Site Hardware Failure (router, switch, AP)

**Probability:** Low. We have experienced 1 AP failure and 1 switch port failure in 12 months of operation.

**Mitigation:** Hot spares for all critical hardware on-site. Replacement time for an AP: < 10 minutes. We run redundant core switches — a single switch failure does not drop the network.

**Resident experience:** Brief disruption if the failed hardware is in their path. Typically < 5 minutes.

### 5. DNS Failure

An often-overlooked failure mode. If your DNS resolver fails, the internet appears to be down even if your IP connectivity is fine.

**Mitigation:** We run a local Unbound DNS resolver caching server on the LAN (`192.168.10.1`). Residents resolve DNS locally. We only hit upstream (Cloudflare 1.1.1.1 / Google 8.8.8.8) for cache misses. If upstream DNS fails, cached responses serve for up to 1 hour.

## What We Cannot Control

We believe in honesty about the limits of our guarantees.

- **Acts of nature:** Extreme weather events (flash floods, landslides blocking roads) could prevent ISP repair crews from reaching fiber cut locations for 24+ hours. In 12 months of operation, this has not occurred during our retreat months.
- **Nationwide ISP routing issues:** A BGP routing failure at the BSNL or Jio national level would affect both our ISPs simultaneously. These are extremely rare and usually resolved within 2–4 hours.
- **Your specific cloud provider:** Our network delivers packets to your provider's ingress. What happens inside AWS, GCP, or Cloudflare is outside our control.

## Real-World Downtime Log (July–August 2025)

| Date | Duration | Cause | Mitigation Activated |
|---|---|---|---|
| July 14, 2025 | 11 min | BSNL planned maintenance | Jio failover activated, zero resident impact |
| August 3, 2025 | 15 min | BSNL planned maintenance | Jio failover activated, zero resident impact |
| **Total** | **26 min** | | |

Measured availability: **99.94%** (exceeds our 99.9% commitment).

## The Monitoring Stack (Open to Residents)

Residents can access our live network dashboard at `http://192.168.10.250` (local LAN only):
- Real-time WAN 1 / WAN 2 status and throughput
- Per-workstation bandwidth consumption
- Last 30 days uptime history
- Current DNS resolver cache hit rate

We have nothing to hide about our infrastructure. If the dashboard shows a problem, we already know about it.

## Read More

This article is part of our infrastructure topic cluster:
- [The Developer's Guide to UPS & Power in Remote India](/blog/ups-power-remote-india)
- [High-Altitude Hardware Failures: What Actually Breaks](/blog/altitude-hardware-failures)
- [VPN Benchmarks from Leh, Ladakh](/blog/vpn-benchmark-ladakh)
- [Full Infrastructure Technical Specifications](/infrastructure)

*If this level of infrastructure rigor is what you need, [apply for our July or August 2026 cohort.](/locations/ladakh)*
